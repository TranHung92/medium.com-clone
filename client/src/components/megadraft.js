import React from 'react'
import Editor from 'react-medium-editor';

// load theme styles with webpack 
require('medium-editor/dist/css/medium-editor.css');
require('medium-editor/dist/css/themes/default.css');
 
// ES module 
 
// CommonJS enviroment 
// var Editor = require('react-medium-editor').default; 

export default class Mega extends React.Component {
  constructor() {
    super()
    this.state = {
      text: 'enter some text'
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(text, medium) {
    this.setState({text: text});
  }

  render() {
    console.log('state', this.state)
    return (
      <div className="app">
        <h1>react-medium-editor</h1>
        <h3>Html content</h3>
        <div>{this.state.text}</div>
 
        <h3>Editor #1 (&lt;pre&gt; tag)</h3>
        <Editor
          tag="pre"
          text={this.state.text}
          onChange={this.handleChange}
          options={{toolbar: {buttons: ['bold', 'italic', 'underline']}}}
        />
        <h3>Editor #2</h3>
        <Editor
          text={this.state.text}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
 
  
 
  
