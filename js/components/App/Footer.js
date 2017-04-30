import React from 'react'
import { Col, Row } from 'react-bootstrap'
import FontAwesome from 'react-fontawesome'
import Relay from 'react-relay'

class Footer extends React.Component {
  render () {
    return (
      <Row>
        <Col>
          <p style={styles.footer}>Made with <FontAwesome name='heart' /> from the Scaphold team</p>
        </Col>
      </Row>
    )
  }
}

export default Relay.createContainer(Footer, {
  fragments: {}
})

const styles = {
  footer: {
    borderTop: '1px, solid, #e5e5e5',
    color: '#777',
    paddingTop: 19,
    textAlign: 'center'
  }
}
