import { io } from "https://cdn.socket.io/4.4.1/socket.io.esm.min.js";
import userService from "./user-service";

export const SOCKET_MESSAGES = {
  NEW_MESSAGE: 'new-message',
  MESSAGE_LIST: 'message-list',
  UPDATE_MESSAGE: 'update-message',
  USER_LIST: 'user-list',
  REMOVE_USER: 'remove-user',
  ADD_USER: 'add-user'
};

class ChatService {

  _subscriptions = [];
  _messages = [];

  constructor() {
    this.socket = io('http://localhost:3000', {
      extraHeaders: {
        "Access-Control-Allow-Origin": "*"
      }});
    this.socket.on('new connection', () => {
      console.log('Established Socket Connection')
    });
    this.socket.onAny(this.receiveMessage.bind(this));
    this.sendMessage(SOCKET_MESSAGES.USER_LIST);
    this.sendMessage(SOCKET_MESSAGES.MESSAGE_LIST);
  }

  receiveMessage(message, ...args) {
    switch(message) {
      case SOCKET_MESSAGES.NEW_MESSAGE:
        this.setMessages(args[0]);
        break;
      case SOCKET_MESSAGES.USER_LIST:
        userService.setUserList(args[0]);
        break;
      default: break;
    }
  }
  sendMessage(message, payload = null) {
    this.socket.emit(message, payload);
  }

  setMessages = (messages = []) => {
    this._messages = messages;
    this._subscriptions.forEach(callback => {
      if(typeof callback === 'function') {
        callback(this._messages);
      }
    })
  }

  subscribe(callback) {
    this._subscriptions.push(callback);
  }
}

export default new ChatService();