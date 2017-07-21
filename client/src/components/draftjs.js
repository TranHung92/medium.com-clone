import React, { Component } from 'react';
import { convertToRaw } from 'draft-js';
import { connect } from 'react-redux';
import {MegadraftEditor, editorStateFromRaw, editorStateToJSON} from "megadraft";
import Editor from 'draft-js-plugins-editor';


import '../styles/mega.css'
//import '../styles/draft.css'
import * as StoriesActions from '../actions';



class Draft extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: editorStateFromRaw(null),
      content: editorStateFromRaw(null)
    }
    this.onClick = this.onClick.bind(this);
  }
  /* eslint-disable*/
  onChangeTitle = (title) => {
    this.setState({
      title,
    })
  };

  onChangeContent = (content) => {
    this.setState({
      content,
    })
  }

  /* eslint-enable*/
  onClick() {
    const titleObj = this.state.title.getCurrentContent();
    const contentObj = this.state.content.getCurrentContent();
    const title = convertToRaw(titleObj).blocks[0].text
    const content = convertToRaw(contentObj).blocks[0].text
    let values = {
      title,
      content
    }
    console.log('clicked', values)
    this.props.createStory(values, () => {
      this.props.history.push('/')
    })
  }


  render() {
    const contentObj = this.state.content.getCurrentContent();
    const content = convertToRaw(contentObj)
    console.log('content', content)
    //console.log('state', editorStateToJSON(this.state.content))
    return (
      <div className='megaEditor'>
          <div >
            <h4>Title</h4>
            <MegadraftEditor
              editorState={this.state.title}
              onChange={this.onChangeTitle}
            />
          </div>   
          <div>
            <h4>Content</h4>
            <MegadraftEditor
              editorState={this.state.content}
              onChange={this.onChangeContent}
            />
          </div>            
          <button onClick={this.onClick}>Submit</button>
      </div>
    );
  }
}

export default connect(null, StoriesActions)(Draft);
