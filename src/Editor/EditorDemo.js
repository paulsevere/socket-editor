import React from 'react'
import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/html';
import './themes/tomorrow_night';

function onChange(newValue) {
  console.log('change', newValue);
}

const defaultText = `var message = "This is awesome!";
  function radical(){
    console.log("coool")
  }
`

// Render editor
export default function(props) {
  let style = props.style || {
    padding: "30px"
  }
  return (
    <div id="editor-holder" style={style}>
    <AceEditor
    mode="html"
    theme="tomorrow_night"
    fontSize={16}
    onChange={console.log}
    name="editor"
    value={defaultText}
    showGutter={false}
    editorProps={{
      $blockScrolling: true,
    }}
    setOptions={{
      showLineNumbers: false
    }}
    />
</div>
  )
}
