import {LitElement, html } from 'lit';
import {repeat} from 'lit/directives/repeat.js';
import style from './side-panel.css.js';
import utilityClassesCss from '../../../utility-classes.css.js';
import 'fa-icons';
import userService, { USER_OBSERVABLES } from '../../../services/user-service.js';
import chatService, { SOCKET_MESSAGES } from '../../../services/chat-service.js';
import { v4 as uuid } from 'uuid';

export class SidePanel extends LitElement {
  
  static get properties() {
    return {
      showJoinModal: {type: Boolean},
      users: { type: Array },
      currentUser: { type: Object }
    };
  }
   
  constructor() {
    super();
    chatService.sendMessage(SOCKET_MESSAGES.ADD_USER, {
      id: uuid(),
      name: 'Bobby The Bot',
      avatar: './images/bot2.png',
      nameColor: 'red'
    });
    userService.subscribe(USER_OBSERVABLES.CURRENT_USER, this.onSetUser.bind(this));
    userService.subscribe(USER_OBSERVABLES.USER_LIST, (users) => this.users = users);
    this.users = [];
    this.showJoinModal = false;
    window.addEventListener("beforeunload", () => {
      if(this.currentUser) {
        chatService.sendMessage(SOCKET_MESSAGES.REMOVE_USER, this.currentUser);
      }
    });
  }

  static styles = [style, utilityClassesCss];

  onToggleModal() {
    if(this.currentUser) {
      chatService.sendMessage(SOCKET_MESSAGES.REMOVE_USER, this.currentUser);
      this.currentUser = null;
    } else {
      this.showJoinModal = !this.showJoinModal;
    }
  }

  onModalClose() {
    this.showJoinModal = false;
  }

  onSetUser(user) {
    if(!user) {
      this.currentUser = null;
    } else {
      this.onModalClose();
      this.currentUser = user;
    }
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    if(this.currentUser) {
      chatService.sendMessage(SOCKET_MESSAGES.REMOVE_USER, this.currentUser);
    }
  }

  render() {
    return html`
      <div class="side-panel-container">
        <div class="btn btn-primary" @click="${this.onToggleModal}">
         ${!this.currentUser 
          ? html `<fa-icon class="fas fa-plus" color="#1967d1" size="16px"></fa-icon>`
          : ''}
         <span class="mx-10">${this.currentUser ? 'LEAVE CHAT' : 'JOIN'}</span>
        </div>
        ${this.showJoinModal ? html `<join-modal @cancel-modal="${this.onModalClose}"></join-modal>` : ''}
        <div class="user-list">
          ${repeat(this.users, (user) => user.id, (user) => html`
          <div class="user-card">
            <div class="user-avatar">
              <img src="${user.avatar}" />
            </div>
            <div class="user-name">${this.currentUser?.id === user.id ? user.name + '(Me)' : user.name}</div>
          </div>`)}
        </div>
      </div>
    `;
  }
}

window.customElements.define('side-panel', SidePanel);
