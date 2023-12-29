import {LitElement, html} from 'lit';
import style from './chat-room.css';

export class ChatRoom extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      currentUser: { type: Object }
    };
  }

  constructor() {
    super();
    // this.socket = io('http://localhost:3000', {
    //   extraHeaders: {
    //     "Access-Control-Allow-Origin": "*"
    // }});
    // this.socket.on('new connection', console.log);
  }

  static styles = [style];

  render() {
    return html`
      <div class="chat-room-container">
        <side-panel></side-panel>
        <chat-window></chat-window>
      </div>
    `;
  }
}

window.customElements.define('chat-room', ChatRoom);
