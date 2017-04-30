import React from 'react'
import Relay from 'react-relay'
import { hashHistory } from 'react-router'

import Body from './Body'
import Header from './Header'

class Home extends React.Component {
  render () {
    if (!window.localStorage.scapholdAuthToken) {
      hashHistory.push('/')
    }

    return (
      <div>
        <Header />
        <Body />
      </div>
    )
  }
}

export default Relay.createContainer(Home, {
  initialVariables: {},
  fragments: {}
})
