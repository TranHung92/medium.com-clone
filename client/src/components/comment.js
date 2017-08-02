import React, { Component } from 'react'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { connect } from 'react-redux';

import { createComment } from '../actions';

class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: EditorState.createEmpty()
		}
	}

	componentDidMount() {
		console.log('props', this.props)
	}

	onChange = (comment) => {
		this.setState({ comment })
	}

	onClick = () => {
    const commentObj = this.state.comment.getCurrentContent()
    const commentJson = JSON.stringify(convertToRaw(commentObj))
    const values = {
    	comment: commentJson,
    	author: this.props.author
    }		
		createComment(this.props.story._id, values)
		this.setState({ comment: EditorState.createEmpty() })
	}

	render() {
		this.props.story.comments.forEach(function(comment) {
			console.log('comment', comment)
		})
		// console.log('comments', this.props.story.comments)
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
	        <div onClick={this.onClick} className="ui primary submit labeled icon button">
	          <i className="icon edit"></i> Add Reply
	        </div>
	      </form>				
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { author: state.auth.user };
}

export default connect(mapStateToProps)(Comment);