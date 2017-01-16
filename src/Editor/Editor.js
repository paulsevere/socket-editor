
import React from 'react';
import Draft, { EditorState, Editor, RichUtils, convertFromRaw, convertToRaw, } from 'draft-js';
import _ from 'lodash'
// import Editor from 'draft-js-plugins-editor';
import esp from 'esprima-fb'
import { BlockStyleControls, InlineStyleControls } from './RichStyles'
import PrismDecorator from './decorators/prism-decorator'
import CodeUtils from 'draft-js-code'
import updateHandler from './updateHandler'
import defaultContent from './defaultContent'
import io from 'socket.io-client'
import keyHandlers from './KeyHandlers'
import { EditorControls, EditorButton } from './ToolBar/toolbar'


import 'prism-themes/themes/prism-duotone-sea.css'

const decorator = new PrismDecorator({
  render: ({type, children}) => <span className={`prism-token token ${type}`}>{children}</span>
});


import createFocusPlugin from 'draft-js-focus-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'; // eslint-disable-line import/no-unresolved
const sideToolbarPlugin = createSideToolbarPlugin();

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();

// const styleMap = {
//   CODE: {
//     backgroundColor: 'rgba(0, 0, 0, 0.05)',
//     fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
//     fontSize: 16,
//     padding: 2,
//   },
// };

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io('http://localhost:3001')
    this.focus = () => this.refs.editor.focus()
    this.state = {
      // editorState: EditorState.createWithContent(defaultContent(), decorators)
      editorState: EditorState.createWithContent(defaultContent(), decorator)
    };

    this.socket.on('new-content-state', this.updateEditorFromIO)

  }

  componentDidMount() {
    keyHandlers(() => updateHandler(this.state.editorState, this.socket))
  // this.blockStyleToggle('code-block')
  }

  onChange = (editorState) => {
    if (this.state.liveMode) {
      this.socket.emit('push-content-state', {
        contentState: convertToRaw(editorState.getCurrentContent()),
        changeType: editorState.getLastChangeType()
      })
    }
    this.setState({
      editorState
    })

  }

  updateEditorFromIO = (stateInfo) => {

    this.setState({
      editorState: EditorState.push(this.state.editorState, convertFromRaw(stateInfo.contentState), stateInfo.changeType)
    })
  }





  blockStyleToggle = (blockType) => {
    this.onChange(
      RichUtils.toggleBlockType(
        this.state.editorState,
        blockType
      )
    );
  }


  inlineStyleToggle = (inlineStyle) => {
    this.onChange(
      RichUtils.toggleInlineStyle(
        this.state.editorState,
        inlineStyle
      )
    );
  }

  handleKeyCommandd = (command) => {
    var newState;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      newState = CodeUtils.handleKeyCommand(editorState, command);
    }

    if (!newState) {
      newState = Draft.RichUtils.handleKeyCommand(editorState, command);
    }

    if (newState) {
      this.onChange(newState);
      return true;
    }
    return false;
  }

  keyBindingFn = (e) => {
    var editorState = this.state.editorState;
    var command;

    if (CodeUtils.hasSelectionInBlock(editorState)) {
      command = CodeUtils.getKeyBinding(e);
    }
    if (command) {
      return command;
    }

    return Draft.getDefaultKeyBinding(e);
  }

  handleReturn = (e) => {
    var editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleReturn(e, editorState)
    );
    return true;
  }

  handleTab = (e) => {
    var editorState = this.state.editorState;

    if (!CodeUtils.hasSelectionInBlock(editorState)) {
      return;
    }

    this.onChange(
      CodeUtils.handleTab(e, editorState)
    );
  }

  //   <InlineStyleControls {...this.state} onToggle={this.inlineStyleToggle}/>
  render() {
    return (

      <div onClick = {this.focus} className="editor-holder">

        <div className="editor-inner">
        <EditorControls>
          <EditorButton name="live toggle" onClick={() => console.log("clicked")}/>
        </EditorControls>

        <Editor
      ref="editor" keyBindingFn={this.keyBindingFn}
      handleKeyCommand={this.handleKeyCommand}
      handleReturn={this.handleReturn}
      onTab={this.handleTab} plugins={[alignmentPlugin, sideToolbarPlugin, focusPlugin]}  editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
      );
  }
}

export default TextEditor;
