import React, { Component } from 'react';
import TextEditor from './Editor/Editor'
import './texteditor.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TextEditor/>
      </div>
      );
  }
}

export default App;
