
import React from 'react';
import { EditorState, RichUtils, convertFromRaw } from 'draft-js';
import _ from 'lodash'
import Editor from 'draft-js-plugins-editor';
import esp from 'esprima-fb'
import { BlockStyleControls, InlineStyleControls } from './RichStyles'
import PrismDecorator from 'draft-js-prism'
import defaultContent from './defaultContent'
// import io from 'socket.io-client'

import 'prismjs/themes/prism-tomorrow.css'


import createFocusPlugin from 'draft-js-focus-plugin';
import createAlignmentPlugin from 'draft-js-alignment-plugin';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin'; // eslint-disable-line import/no-unresolved
const sideToolbarPlugin = createSideToolbarPlugin();

const focusPlugin = createFocusPlugin();
const alignmentPlugin = createAlignmentPlugin();

const styleMap = {
  CODE: {
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

class TextEditor extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io('http://localhost:3001')
    this.focus = () => this.refs.editor.focus()
    let decorator = PrismDecorator()
    this.state = {
      editorState: EditorState.createWithContent(defaultContent(), decorator)
    };

    // this.socket.on('new-content-state', this.updateEditorFromIO)

  }

  tokenize = (text) => {
    let tokens = esp.tokenize(text);
    console.log(tokens)
    let blocks = tokens.reduce((prev, curr) => {
      return prev.concat((new Array(curr.value.length)).fill(curr.type))
    }, [])
    console.log(blocks)
  }

  onChange = (editorState) => {
    // this.socket.emit('push-content-state', {
    //   contentState: convertToRaw(editorState.getCurrentContent()),
    //   changeType: editorState.getLastChangeType()
    // })
    let content = editorState.getCurrentContent();
    console.dir(content.getFirstBlock().getCharacterList());
    let plainText = content.getPlainText();

    this.tokenize(plainText)
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



  render() {
    return (
      <div onClick = {this.focus} className="editor-holder">
        <div className="editor-inner">
          <BlockStyleControls {...this.state} onToggle={this.blockStyleToggle}/>
            <InlineStyleControls {...this.state} onToggle={this.inlineStyleToggle}/>

        <Editor
      ref="editor" plugins={[alignmentPlugin, sideToolbarPlugin, focusPlugin]} customStyleMap={styleMap} editorState={this.state.editorState} onChange={this.onChange} />
        </div>
      </div>
      );
  }
}

export default TextEditor;
