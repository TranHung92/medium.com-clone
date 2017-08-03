import React, { Component } from 'react'
import Editor, { composeDecorators } from 'draft-js-plugins-editor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';

import * as actions from '../actions';

import '../styles/comment.css'

class Comment extends Component {
	constructor() {
		super();
		this.state = {
			comment: EditorState.createEmpty()
		}
	}

	componentDidMount() {
		this.props.fetchComments(this.props.story._id)
	}

	onChange = (comment) => {
		this.setState({ comment })
	}

	loadComments = () => {}

	onClick = () => {
    const commentObj = this.state.comment.getCurrentContent()
    const commentJson = JSON.stringify(convertToRaw(commentObj))
    const values = {
    	comment: commentJson,
    	author: this.props.auth.user
    }		
		this.props.createComment(this.props.story._id, values)
		this.setState({ comment: EditorState.createEmpty() })
	}

	renderComments() {
		return _.map(this.props.comments, comment => {
			const content = convertFromRaw(JSON.parse(comment.content))
			return (
				<div key={comment._id} className="comment">
			    <a className="avatar">
			      <img src="https://pbs.twimg.com/profile_images/788826057218613252/_lVdNt4E.jpg" />
			    </a>
			    <div className="content">
			      <a className="author">{comment.author.username}</a>
			      <div className="text">
							<Editor 
								editorState={EditorState.createWithContent(content)}
								onChange={this.loadComments}
								readOnly={true}
							/>	
			      </div>
			    </div>
			   </div>
			)
		})
	}

	renderCommentForm() {
		return (
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
		)
	}

	render() {
		
		return (
			<div className="ui comments">
				<h3 className="ui dividing header">Comments</h3>
				{this.renderComments()}
				{this.props.auth.authenticated === true ? this.renderCommentForm() : null}
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { 
  	auth: state.auth,
  	comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
	return {
		fetchComments: bindActionCreators(actions.fetchComments, dispatch),
		createComment: bindActionCreators(actions.createComment, dispatch),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment);