import {css} from 'lit';

export default css`
:host {
  background: #f3f3f3;
  width: 100%;
  
}
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

.chat-container {
  display: flex;
  position: relative;
  height: 100%;
  flex-direction: column;
  box-sizing: border-box;
  padding: 20px;
  justify-content: space-between;
  align-items: center;
  .message-input {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      width: 95%;
      padding: 10px 20px;
      border-radius: 10px;
      border: 1px solid #2998f2;
      outline: none;
      font-size: 16px;
      font-weight: 500;
      color: #393d40;
      transition: 0.3s;
    }

    .send-icon {
      position: relative;
      right: 40px;
      cursor: pointer;
    }
  }

  .message-list {
    width: 100%;
    overflow-y: auto;
    scroll-behavior: smooth;

    .message-container {
      display: flex;
      justify-content: start;
      margin: 50px 0;
      position: relative; 

      .message {
        border-radius: 10px;
        padding: 10px 20px;
        font-size: 18px;
        background: #e6ecf5;
        margin-left: 50px;
        position: relative;
        display: flex;
        flex-direction: column;
        box-shadow: -1px 2px 6px 0px rgba(0,0,0,0.75);
        cursor: pointer;

        .user-name {
          font-weight: bold;
          color: #7294c4;
          font-size: 14px;
          font-family: 'Poppins', sans-serif;
        }

        .message-time {
          font-weight: bold;
          font-size: 10px;
          color: gray;
          position: absolute;
          right: 10px;
          top: 10px;
        }

        .emoji-panel {
          position: absolute;
          border-radius: 10px;
          z-index: 10001;
          border: 1px solid #b5bdc7;
          background: #f6f6f6;
          display: flex;
          width: fit-content;
          height: auto;
          top: -20px;
          left: 0;
          right: 0;
          margin: 0 auto;
          padding: 3px;
          opacity: 0;
          transition: 0.3s;

          .emoji-img {
            width: 25px;
            height: 25px;
            margin: 0 3px;
            transition: 0.3s;

            &:hover {
              transform: scale(1.4);
            }
          }
        }

        &:hover {
          .emoji-panel {
            opacity: 1;
          }
        }

        &.me {
          background: #9ed9d2;
          color: #3e3f40;
        }

        .emojis {
          position: relative;
          bottom: -10px;
          left: 0;

          img {
            width: 20px;
            height: 20px;
          }

          .emoji-count {
            z-index: 10002; 
            color: black;
            font-weight: bold;
            font-size: 10px;
            position: relative;
            bottom: 0;
            right: 5px;
          }
        }
      }
      .user-avatar {
        position: absolute;
        width: 60px;
        height: 60px;
        left: 0;
        top: -30px;
      }
    }
   
  }
}

`;