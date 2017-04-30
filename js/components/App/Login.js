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
  NavItem
} from 'react-bootstrap'
import Relay from 'react-relay'
import { hashHistory } from 'react-router'

import * as Auth from './../../auth/Auth'

class Login extends React.Component {

  constructor (props) {
    super(props)

    this.state = {
      errors: null,
      showModal: false,
      loginEmail: '',
      loginPassword: ''
    }

    this._handleLoginEmailChange = this._handleLoginEmailChange.bind(this)
    this._handleLoginPasswordChange = this._handleLoginPasswordChange.bind(this)
    this.close = this.close.bind(this)
    this.loginUser = this.loginUser.bind(this)
    this.open = this.open.bind(this)
    this.validateInput = this.validateInput.bind(this)
  }

  _handleLoginEmailChange (event) {
    this.setState({
      loginEmail: event.target.value
    })
  }

  _handleLoginPasswordChange (event) {
    this.setState({
      loginPassword: event.target.value
    })
  }

  close () {
    this.setState({showModal: false})
  }

  loginUser () {
    if (this.validateInput()) {
      Auth.login(this.state.loginEmail, this.state.loginPassword).then(data => {
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

  open () {
    this.setState({showModal: true})
  }

  validateInput () {
    return (
      this.state.loginEmail && this.state.loginEmail.length &&
      this.state.loginPassword && this.state.loginPassword.length
    )
  }

  render () {
    return (
      <NavItem onClick={this.open}>
        Login

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Login Here!</Modal.Title>
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
              <FormGroup>
                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                  Email
                </Col>
                <Col sm={8}>
                  <FormControl type='email' placeholder='Email' onChange={this._handleLoginEmailChange} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col componentClass={ControlLabel} smOffset={1} sm={2}>
                  Password
                </Col>
                <Col sm={8}>
                  <FormControl type='password' placeholder='Password' onChange={this._handleLoginPasswordChange} />
                </Col>
              </FormGroup>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button bsStyle='primary' type='submit' onClick={this.loginUser}>Login</Button>
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

export default Relay.createContainer(Login, {
  fragments: {}
})
