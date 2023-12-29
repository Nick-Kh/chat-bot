import express from 'express';
import httpServer from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

const app = express();

app.use(cors());
const http =  httpServer.createServer(app);

http.listen(3000, () => {
    console.log('listening on *:3000');
});

const io = new Server(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true
    }
});

app.get('/', (req, res) => {
    res.send('Hello World!')
});

export const SOCKET_MESSAGES = {
  NEW_MESSAGE: 'new-message',
  MESSAGE_LIST: 'message-list',
  UPDATE_MESSAGE: 'update-message',
  USER_LIST: 'user-list',
  REMOVE_USER: 'remove-user',
  ADD_USER: 'add-user'
};

io.on('connection', (socket) => {
    console.log('new connection');
    io.emit('new connection', 'new connection');

    let users = [];
    let messages = [];
    let botUser = null;      

    socket.on(SOCKET_MESSAGES.NEW_MESSAGE, (payload) => {
        if(payload.text.includes('?')) {
            let index = messages.findIndex(msg => {
                return msg.text.includes('?') && (msg.text.toLowerCase().trim() === payload.text.toLowerCase().trim());
            });
            if(index !== -1 && messages[index + 1]) {
                messages.push(payload);
                messages.push({
                    ...messages[index+1],
                    user: botUser
                });
            } else {
                messages.push(payload);
            }
        } else {
            messages.push(payload);
        }
        io.emit(SOCKET_MESSAGES.NEW_MESSAGE, messages);
    });

    socket.on(SOCKET_MESSAGES.MESSAGE_LIST, () => {
        io.emit(SOCKET_MESSAGES.NEW_MESSAGE, messages);
    });

    socket.on(SOCKET_MESSAGES.UPDATE_MESSAGE, (message) => {
        let index = messages.findIndex(msg => msg.id === message.id);
        messages[index].emojis = message.emojis;
        io.emit(SOCKET_MESSAGES.NEW_MESSAGE, messages);
    });
        
    socket.on(SOCKET_MESSAGES.USER_LIST, () => {
        io.emit(SOCKET_MESSAGES.USER_LIST, users);
    });

    socket.on(SOCKET_MESSAGES.REMOVE_USER, (userToRemove) => {
        users = users.filter(user => user.id !== userToRemove.id);
        io.emit(SOCKET_MESSAGES.USER_LIST, users);
    });

    socket.on(SOCKET_MESSAGES.ADD_USER, (newUser) => {
        if(!botUser && newUser.name === 'Bobby The Bot') {
            botUser = newUser;
        }
        users.push(newUser);
        io.emit(SOCKET_MESSAGES.USER_LIST, users);
    });
});

