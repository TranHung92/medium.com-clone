import React, { Component } from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Signin from './auth/signin'
import Signup from './auth/signup'

class ModalAuth extends Component {
	constructor(props) {
		super(props);
		this.state = {
			signin: true
		}
	}

	onClick() {
		this.setState({ signin: !this.state.signin })
		console.log('signin', this.state.signin)
	}

	render() {
		console.log('state',this.state.signin)
		return (
		  <Modal size='small' dimmer='inverted' trigger={this.props.trigger}>
		    <Modal.Header>
		    	{this.state.signin ? 'Signin' : 'Signup'}
		    </Modal.Header>
		    <Modal.Content>
		    	{this.state.signin ? <Signin /> : <Signup />}
		    </Modal.Content>
		    <div onClick={this.onClick.bind(this)}>
		    	<h3>{this.state.signin}</h3>
		    	<a type="button">{this.state.signin ? 'Signup' : 'Signin'}</a>
		    </div>
		  </Modal>
		)
	}
}

 

export default ModalAuth