import React from 'react'
import { Nav, Navbar, NavItem } from 'react-bootstrap'
import Relay from 'react-relay'
import {hashHistory} from 'react-router'

import Logout from './Logout'

class Header extends React.Component {
  constructor (props) {
    super(props)
    this.goHome = this.goHome.bind(this)
    this.goToGraphiQL = this.goToGraphiQL.bind(this)
  }

  goToGraphiQL () {
    hashHistory.push('/graphiql')
  }

  goHome () {
    hashHistory.push('/')
  }

  render () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const loggedInUser = user ? user.username : ''

    return (
      <Navbar style={styles.navbar}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href='/'>Scaphold</a>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullRight>
          <NavItem onClick={this.goHome}>Home</NavItem>
          <NavItem onClick={this.goToGraphiQL}>GraphiQL</NavItem>
          <NavItem>{loggedInUser}</NavItem>
          <Logout />
        </Nav>
      </Navbar>
    )
  }
}

export default Relay.createContainer(Header, {
  fragments: {}
})

const styles = {
  navbar: {
    marginBottom: 0
  }
}
