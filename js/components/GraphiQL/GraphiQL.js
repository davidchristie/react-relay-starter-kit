import GraphiQL from 'graphiql'
import fetch from 'isomorphic-fetch'
import React from 'react'
import Relay from 'react-relay'

import config from './../../../config'
import Header from './../App/Header'
import LoggedInHeader from './../Home/Header'

function graphQLFetcher (graphQLParams) {
  return fetch(config.scapholdUrl, {
    body: JSON.stringify(graphQLParams),
    headers: {
      'Authorization': `Bearer ${window.localStorage.scapholdAuthToken}`,
      'Content-Type': 'application/json'
    },
    method: 'post'
  }).then(response => response.json())
}

class GraphiQLModule extends React.Component {
  render () {
    let header
    if (!window.localStorage.scapholdAuthToken) {
      header = <Header />
    } else {
      header = <LoggedInHeader />
    }

    return (
      <span>
        {header}
        <GraphiQL fetcher={graphQLFetcher} />
      </span>
    )
  }
}

export default Relay.createContainer(GraphiQLModule, {
  initialVariables: {},
  fragments: {}
})
