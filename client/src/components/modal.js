import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import Signin from './auth/signin'

const ModalAuth = ({trigger}) => (
  <Modal size='small' dimmer='inverted' trigger={trigger}>
    <Modal.Header>Signin/Signup</Modal.Header>
    <Modal.Content>
    	<Signin />
    </Modal.Content>
  </Modal>
)

export default ModalAuth