import React from 'react'
import Relay from 'react-relay'
import { hashHistory } from 'react-router'

import Description from './Description'
import Footer from './Footer'
import Header from './Header'
import Hero from './Hero'

class App extends React.Component {
  componentWillMount () {
    if (window.localStorage.scapholdAuthToken) {
      hashHistory.push('/home')
    }
  }

  render () {
    return (
      <div>
        <Header />
        <Hero />
        <Description />
        <Footer />
      </div>
    )
  }
}

export default Relay.createContainer(App, {
  fragments: {}
})
