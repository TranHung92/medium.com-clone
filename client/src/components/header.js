import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Modal from './modal'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import * as AuthActions from '../actions'

class Header extends Component {
	renderWriteStory() {
		if (this.props.authenticated) {
			return (
				<div className='right menu'>
					<Link className='item' to='/new-story'>Write a story</Link>
					<Link className='item' onClick={this.props.signoutUser} to='/'>Signout</Link>
				</div>
			)
		} else {
			return (
				<div className='right menu'>
					<Modal trigger={<a className='item'>Write a story</a>} />
					<Modal trigger={<a className='item'>Signin/Signup</a>} />
				</div>
			)
		}
	}

	render() {
		return (
			<div className='ui menu container'>
				<Link className='item' to='/'>Medium</Link>
				<div className='right menu'>
					{this.renderWriteStory()}
					<Link className='item' to='/'>Search</Link>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated };
}

export default withRouter(connect(mapStateToProps, AuthActions)(Header))