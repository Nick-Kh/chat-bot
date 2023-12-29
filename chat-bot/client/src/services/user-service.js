import chatService, { SOCKET_MESSAGES } from "./chat-service";

export const USER_OBSERVABLES = {
  CURRENT_USER: 'current-user',
  USER_LIST: 'user-list'
}

class UserService {
  _currentUser = null;
  _users = [];
  _userlistSubscribers = [];
  _userSubscribers = [];

  setCurrentUser(user) {
    if(user?.id && user?.name) {
      this._currentUser = user;
      chatService.sendMessage(SOCKET_MESSAGES.ADD_USER, this._currentUser);
    } else {
      this._users = this._users.filter(user => user.id !== this._currentUser.id);
      chatService.sendMessage(SOCKET_MESSAGES.REMOVE_USER, this._currentUser);
      this._currentUser = null;
    }
    this._userSubscribers.forEach(callback => {
      if(typeof callback === 'function') {
        callback(this._currentUser);
      }
    });
    
  }

  setUserList(users) {
    if(Array.isArray(users)) {
      this._users = users;
      this._userlistSubscribers.forEach(callback => {
        if(typeof callback === 'function') {
          callback(this._users);
        }
      });
    }
  }

  getCurrentUser() {
    return this._currentUser;
  }

  getUserList() {
    return this._users;
  }

  subscribe(observable, callback) {
    if(observable === USER_OBSERVABLES.CURRENT_USER) {
      this._userSubscribers.push(callback);
    }
    if(observable === USER_OBSERVABLES.USER_LIST) {
      this._userlistSubscribers.push(callback);
    }
  }
}

export default new UserService();