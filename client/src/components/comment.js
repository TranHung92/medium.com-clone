import React, { Component } from 'react'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'



class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: EditorState.createEmpty()
		}
	}

	onChange = (comment) => {
		this.setState({ comment })
	}

	render() {
		return (
			<div className="ui comments">
	      <form className="ui reply form">
	        <div className="field">
	          <Editor 
							editorState={this.state.comment}
							onChange={this.onChange}
							placeholder='write a comment'
	          />
	        </div>
	        <div className="ui primary submit labeled icon button">
	          <i className="icon edit"></i> Add Reply
	        </div>
	      </form>				
			</div>

		)
	}
}

export default Comment;