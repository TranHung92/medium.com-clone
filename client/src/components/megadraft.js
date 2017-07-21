import React from "react";
import {MegadraftEditor, editorStateFromRaw} from "megadraft";

import '../styles/mega.css'


export default class Mega extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: editorStateFromRaw(null)};
    this.onChange = this.onChange.bind(this);
  }

  onChange(editorState) {
    this.setState({editorState});
  }

  render() {
    return (
      <div className='container'>
        <h3 className='world'>hello world</h3>
        <MegadraftEditor
          editorState={this.state.editorState}
          onChange={this.onChange}/>        
      </div>
    )
  }
}