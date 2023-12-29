import style from './chat-window.css';
import {LitElement, html} from 'lit';
import 'fa-icons';
import utilityClassesCss from '../../../utility-classes.css';
import {classMap} from 'lit/directives/class-map.js';
import {styleMap} from 'lit-html/directives/style-map.js';
import {repeat} from 'lit/directives/repeat.js';
import userService, { USER_OBSERVABLES } from '../../../services/user-service';
import chatService, { SOCKET_MESSAGES } from '../../../services/chat-service';
import { v4 as uuid } from 'uuid';

export const KEYS = {
  ESCAPE: 27,
  ENTER: 13
};

export class ChatWindow extends LitElement {
  static get properties() {
    return {
      currentMessage: { type: String },
      messages: { type: Array },
      currentUser: { type: Object }
    };
  }
  static styles = [style, utilityClassesCss];

  constructor() {
    super();
    this.currentMessage = '';
    this.messages = [];
    userService.subscribe(USER_OBSERVABLES.CURRENT_USER, (user) => this.currentUser = user);
    chatService.subscribe(this.updateChatMessages.bind(this));
  }

  onInput(event) {
    this.currentMessage = event.target.value;
  }

  onKeyPress(event) {
    if(event.charCode === KEYS.ENTER) {
      this.onSendMessage();
    }
    if(event.charCode === KEYS.ESCAPE) {
      this.currentMessage = '';
    }
  }

  updateChatMessages(messages) {
    this.messages = messages;
    this.chatScrollDown();
  }

  chatScrollDown() {
    setTimeout(() => {
      let messageListEl = this.shadowRoot.querySelector(".message-list");
      if(messageListEl) {
        messageListEl.scrollTop = messageListEl.scrollHeight;
      }
    }, 100);
  }

  onSendMessage() {
    if(this.currentMessage) {
      const newMessage = {
        id: uuid(),
        user: this.currentUser,
        text: this.currentMessage,
        emojis: {},
      }
      chatService.sendMessage(SOCKET_MESSAGES.NEW_MESSAGE, newMessage);
    }
    this.currentMessage = '';
  }

  onEmojiSelect(message, url) {
    if(!message.emojis[url]) {
      message.emojis = {
        ...message.emojis,
        [url]: 1
      }
    } else {
      message.emojis[url]++;
    }
    chatService.sendMessage(SOCKET_MESSAGES.UPDATE_MESSAGE, message);
  }

  render() {
    const emojiList = [];
    for(let i = 1; i<=5; i++) {
      let url = `./images/emojis/emoji${i}.png`;
      emojiList.push(url);
    }
    return html`
      <div class="chat-container">
        <div class="message-list">
          ${repeat(this.messages, (message) => html`
           <div class="message-container">
            <img class="user-avatar" src="${message.user.avatar}" />
            <span class="message ${classMap({ me: this.currentUser && message.user?.id === this.currentUser?.id })}">
              <span class="user-name" style=${styleMap({ color: message.user.nameColor })}>
                ${this.currentUser?.id === message.user?.id ? 'Me' : message.user.name}
              </span>
              <span class="message-time">${message.time}</span>
              ${message.text}
              ${Object.keys(message.emojis).length ? html `<div class="emojis">
                  ${repeat(Object.keys(message.emojis), (key) => html `
                    <img src="${key}" />
                    <span class="emoji-count">${message.emojis[key]}</span>
                  `)}
              </div>` : ''}
              <div class="emoji-panel">
                ${repeat(emojiList, (emoji) => html `
                  <img class="emoji-img" src="${emoji}" @click="${() => this.onEmojiSelect(message, emoji)}"/>
                `)}
              </div>
            </span>
           </div>`)}
        </div>
        ${this.currentUser ? html `<div class="message-input">
          <input type="text" @input="${this.onInput}" .value="${this.currentMessage}" @keypress="${this.onKeyPress}" />
          <span class="send-icon ${classMap({ disabled: !this.currentMessage })}">
            <fa-icon class="fa fa-paper-plane" color="${ this.currentMessage ? '#2998f2' : 'gray'}" size="20px"></fa-icon>
          </span>
        </div>` : ''}
      </div>
    `;
  }
}

window.customElements.define('chat-window', ChatWindow);