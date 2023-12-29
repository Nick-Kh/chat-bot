import {css} from 'lit';

export default css`
.btn {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px 20px;
  color: white;
  cursor: pointer;
  margin: 0 10px;
  border-radius: 7px;
  transition: 0.3s;
  font-weight: bold;

  &.disabled {
    cursor: not-allowed;
    color: gray;
    background: #f6f6f6;
    pointer-events: none;
    border: 2px solid gray;
  }
}

.btn-primary {
    background: white;
    color: #1967d1;
    border: 2px solid #1967d1;

    &:hover {
      opacity: 0.8;
    }
}

.btn-secondary {
  background: white;
  color: #2e3adb;

  &:hover {
    background: #2e3adb;
    color: white;
  }
}

.disabled {
  cursor: auto;
  color: gray;
  background: #f6f6f6;
  pointer-events: none;
}

.mx-5 {
  margin: 0 5px;
}

.mx-10 {
  margin: 0 10px;
}
`;