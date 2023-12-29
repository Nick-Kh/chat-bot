import {LitElement, html} from 'lit';
import style from './chat-header.css.js';

export class ChatHeader extends LitElement {

  static styles = [style];

  render() {
    return html`
      <div class="chat-header">
        <img class="chat-logo" src='./images/bot2.png'></img>
        <span class="chat-title">Leet Chat</span>
      </div>
    `;
  }
}

window.customElements.define('chat-header', ChatHeader);
