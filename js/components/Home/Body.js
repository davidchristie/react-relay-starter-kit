import React from 'react'
import { Button, Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Relay from 'react-relay'

import Description from '../App/Description'

class Body extends React.Component {
  render () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    const loggedInUser = user ? user.username : ''

    return (
      <div>
        <Row style={styles.heading}>
          Welcome, you{`'`}ve successfully logged in to <a href='https://scaphold.io' target='_blank' style={styles.scaphold}>Scaphold</a>{`'`}s React Relay Starter Kit!
        </Row>
        <Row style={styles.subheading}>
          <Col smOffset={3} sm={6}>
            {
              loggedInUser
                ? (
                  <div style={styles.subheading.section}>
                      Username: <b>{loggedInUser}</b>
                  </div>
                )
                : ''
            }
            <div style={styles.subheading.section}>
              Feel free to poke around and check out the other functionality that this starter kit provides. We{`'`}ve put together a couple tools for you to get this starter kit rolling.
            </div>
            <div style={styles.subheading.section}>
              So by all means, modify the code, break it, and learn about the same awesome technology that Facebook is built on.
            </div>
            <div style={styles.subheading.section}>
              <Button bsStyle='primary' bsSize='large' target='_blank' href='https://scaphold.io'>Learn more <FontAwesome name='check' /></Button>
              <Button style={styles.slack} bsSize='large' target='_blank' href='https://scapholdslackin.herokuapp.com/'>Join our Slack <FontAwesome name='slack' /></Button>
            </div>
          </Col>
        </Row>
        <Description />
      </div>
    )
  }
}

export default Relay.createContainer(Body, {
  fragments: {}
})

const styles = {
  heading: {
    fontSize: '25px',
    padding: '100px 0 50px 0',
    textAlign: 'center'
  },
  scaphold: {
    color: '#1DAAA0'
  },
  slack: {
    backgroundColor: '#1DAAA0',
    color: 'white'
  },
  subheading: {
    fontSize: '18px',
    padding: '0 0 50px 0',
    section: {
      padding: '25px'
    },
    textAlign: 'center'
  }
}
