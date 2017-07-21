import React, { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import * as StoriesActions from '../actions';

import Header from './header'

class StoriesNew extends Component {
	renderField(field) {
		const { meta: { touched, error } } = field;
		const className = `form-group ${touched && error ? 'has-danger' : ''}`;

		return (
			<div className={className}>
				<lable>{field.lable}</lable>
				<input 
					type="text"
					placeholder='whats up?'
					className="form-control"
					{...field.input}
				/>
				<div className='text-help'>
					{touched ? error : ''}
				</div>
			</div>
		)
	}

	onSubmit(values) {
		this.props.createStory(values, () => {
			this.props.history.push('/')
		})
	}

	render() {
		const { handleSubmit } = this.props;
		return (
			<div>
				<Header />
				<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
					<Field
						label='Title'
						name='title'
						component={this.renderField}
					/>
					<Field
						label='Content'
						name='content'
						component={this.renderField}
					/>
					<button type='submit' className='btn btn-primary'>Submit</button>
					<Link to='/' className='btn btn-danger'>Cancel</Link>
				</form>			
			</div>
		)
	}
}
function validate(value) {
	const errors = {}
	if (!value.title) {
		errors.title = 'Enter a title!'
	}
	if (!value.content) {
		errors.content = 'Enter a content!'
	}
	return errors
}

export default reduxForm({
	validate,
	form: 'StoriesNewForm'
})(
	connect(null, StoriesActions)(StoriesNew)
)