import React from 'react'
import {
  Alert,
  Button,
  Col,
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Modal,
  NavItem,
  Row
} from 'react-bootstrap'
import Relay from 'react-relay'
import { hashHistory } from 'react-router'

import * as Auth from '../../auth/Auth'

class Register extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      showModal: false,
      registerEmail: '',
      registerPassword: ''
    }

    this._handleRegisterEmailChange = this._handleRegisterEmailChange.bind(this)
    this._handleRegisterPasswordChange = this._handleRegisterPasswordChange.bind(this)
    this.close = this.close.bind(this)
    this.open = this.open.bind(this)
    this.registerUser = this.registerUser.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  _handleRegisterEmailChange (event) {
    this.setState({
      registerEmail: event.target.value
    })
  }

  _handleRegisterPasswordChange (event) {
    this.setState({
      registerPassword: event.target.value
    })
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  registerUser () {
    if (this.validateInput()) {
      Auth.register(this.state.registerEmail, this.state.registerPassword).then(data => {
        if (!data.errors) {
          window.localStorage.setItem('scapholdAuthToken', data.loginUser.token)
          window.localStorage.setItem('user', JSON.stringify(data.loginUser.user))
          this.setState({ errors: [] })
          hashHistory.push('/home')
        } else {
          this.setState({ errors: data.errors })
        }
      }).catch(errors => {
        this.setState({ errors })
      })
    } else {
      this.setState({
        errors: 'Username or password was not filled out. Please fill out the required fields.'
      })
    }
  }

  validateInput () {
    return (
      this.state.registerEmail && this.state.registerEmail.length &&
      this.state.registerPassword && this.state.registerPassword.length
    )
  }

  render () {
    return (
      <NavItem onClick={this.open}>
        Register

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Register Here!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={styles.errors}>
              {
                this.state.errors
                  ? <Alert bsStyle='danger'>{this.state.errors}</Alert>
                  : ''
              }
            </div>
            <Form horizontal>
              <Row>
                <FormGroup>
                  <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Email
                  </Col>
                  <Col sm={8}>
                    <FormControl type='email' placeholder='Email' onChange={this._handleRegisterEmailChange} />
                  </Col>
                </FormGroup>

                <FormGroup>
                  <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                    Password
                  </Col>
                  <Col sm={8}>
                    <FormControl type='password' placeholder='Password' onChange={this._handleRegisterPasswordChange} />
                  </Col>
                </FormGroup>
              </Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' type='submit' onClick={this.registerUser}>Register</Button>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </NavItem>
    )
  }
}

const styles = {
  errors: {
    textAlign: 'left',
    color: 'red'
  }
}

export default Relay.createContainer(Register, {
  fragments: {}
})
