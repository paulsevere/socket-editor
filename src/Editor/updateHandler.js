import { convertToRaw } from 'draft-js';


export default function(editorState, socket) {
  // console.log(editorState.getCurrentContent())
  // console.log(editorState.getLastChangeType())
  let updateObj = {
    contentState: convertToRaw(editorState.getCurrentContent()),
    changeType: editorState.getLastChangeType()
  }
  socket.emit('push-content-state', updateObj);


}
