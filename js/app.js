import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Relay from 'react-relay'
import {
  applyRouterMiddleware,
  hashHistory,
  Route,
  Router,
  routes
} from 'react-router'
import useRelay from 'react-router-relay'

import config from './../config'
import App from './components/App/App'
import GraphiQLModule from './components/GraphiQL/GraphiQL'
import Home from './components/Home/Home'

const options = {}
if (window.localStorage.scapholdAuthToken) {
  options.headers = {
    Authorization: 'Bearer ' + window.localStorage.scapholdAuthToken
  }
}

Relay.injectNetworkLayer(
  new Relay.DefaultNetworkLayer(config.scapholdUrl, options)
)

ReactDOM.render(
  <Router
    environment={Relay.Store}
    history={hashHistory}
    render={applyRouterMiddleware(useRelay)}
    routes={routes}
  >
    <Route path='/' component={App} />
    <Route path='/graphiql' component={GraphiQLModule} />
    <Route path='/home' component={Home} />
  </Router>,
  document.getElementById('root')
)

/* Add queries={HomeQueries} prepareParams={prepareHomeParams} as attributes to the 'home' route to make queries defined in /routes/HomeRoute.js */
