import {css} from 'lit';

export default css`
.side-panel-container {
  display: flex;
  position: relative;
  box-sizing: border-box;
  flex-direction: column;
  background: #0c2e5c;
  height: calc(100% - 1px);
  width: 500px;
  align-items: center;
  padding: 20px;
  overflow-y: auto;
  margin-top: 1px;
}
.user-list {
  width: 100%;
  .user-card {
   display: flex;
   width: 100%;
   align-items: center;
   justify-content: flex-start;
   cursor: pointer;
   margin: 30px 0;
   transition: 0.3s;
   color: white;
   font-size: 24px;
   
   img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    background: white;
    transition: 0.3s;
    margin: 0 10px;
   }
 }
}
`;