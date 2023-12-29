import {LitElement, html} from 'lit';
import style from './join-modal.css.js';
import utilityClassesCss from '../../../../utility-classes.css.js';
import {classMap} from 'lit/directives/class-map.js';
import userService from '../../../../services/user-service.js';
import { v4 as uuid } from 'uuid';

export class JoinModal extends LitElement {

  constructor() {
    super();
    this.nickName = '';
    this.avatar = '';
    this.canJoin = false;
  }

  static styles = [style, utilityClassesCss];

  static get properties() {
    return {
      nickName: { type: String },
      avatar: { type: String }
    };
  }

  onInput(event) {
    this.nickName = event.target.value;
  }

  onAvatarSelect(path) {
    if(!path || path === this.avatar) {
      this.avatar = '';
    } else {
      this.avatar = path;
    }
  }

  onCancel() {
    this.dispatchEvent(new CustomEvent('cancel-modal'));
  }

  onJoin() {
    userService.setCurrentUser({
      id: uuid(),
      name: this.nickName,
      avatar: this.avatar,
      nameColor: this.getRandomNameColor()
    });
  }

  getRandomNameColor() {
    let colors = ['orange', 'purple', 'green', 'brown', 'red', 'blue', 'yellow'];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  render() {
    const avatarList = [];
    for(let i = 1; i<=6; i++) {
      let url = `./images/avatars/avatar${i}.png`;
      avatarList.push(html`<img src="${url}" class=${classMap({ selected: this.avatar === url })} @click=${() => this.onAvatarSelect(url)} />`);
    }
    return html`
      <div class="join-modal-container">
        <div class="name-input">
          <label>Nickname</label>
          <input type="text" @input="${this.onInput}" value="${this.nickName}" />
        </div>
        <div class="avatar-picker">
          <label>Avatar</label>
          <div class="avatar-list">
            ${avatarList}
          </div>
        </div>
        <div class="modal-footer">
          <span class="btn btn-primary ${classMap({ disabled: !this.avatar || !this.nickName })}" @click="${this.onJoin}">
            Join
          </span>
          <span @click="${this.onCancel}" class="btn btn-primary">
            Cancel
          </span>
        </div>
      </div>
    `;
  }
}

window.customElements.define('join-modal', JoinModal);