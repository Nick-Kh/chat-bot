import {css} from 'lit';

export default css`
.join-modal-container {
  position: absolute;
  top: 80px;
  left:0;
  right:0;
  margin-left: auto;
  margin-right: auto;
  width: 350px;
  height: auto;
  background: white;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 20px;

  &:after {
    content: " ";
    position: absolute;
    right: calc(50% - 15px);
    top: -15px;
    border-top: none;
    border-right: 15px solid transparent;
    border-left: 15px solid transparent;
    border-bottom: 15px solid white;
  }

  .name-input {
    display: flex;
    flex-direction: column;
    margin: 20px 0;

    input {
      border-radius: 5px;
      border: 1px solid blue;
      padding: 5px 10px;
      margin: 10px 0;
      font-size: 20px;
      &:focus {
        outline: none;
      }
    }
  }

  .avatar-picker {
    display: flex;
    flex-direction: column;

    .avatar-list {
      display: flex;
      flex-wrap: wrap;

      img {
        box-sizing: border-box;
        width: 90px;
        height: 90px;
        margin: 5px 10px;
        cursor: pointer;
        transition: 0.3s;
        border: 1px solid transparent;
        border-radius: 50%;
        padding: 5px;

        &:hover {
          transform: scale(1.1);
        }
        
        &.selected {
          background: #1967d1;
        }
      }
    }
    
  }
  label {
    font-weight: bold;
  }

  .modal-footer {
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
}
`;