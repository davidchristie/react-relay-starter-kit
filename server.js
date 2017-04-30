import express from 'express'
import path from 'path'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'

import config from './config'

const APP_PORT = 3001

const compiler = webpack({
  entry: path.resolve(__dirname, 'js', 'app.js'),
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel',
        test: /\.js$/
      }
    ]
  },
  output: {filename: 'app.js', path: '/'}
})

const app = new WebpackDevServer(compiler, {
  contentBase: '/public/',
  publicPath: '/js/',
  proxy: { '/graphql': config.scapholdUrl },
  stats: {colors: true}
})
app.use('/', express.static(path.resolve(__dirname, 'public')))
app.listen(APP_PORT, () => {
  console.log(`App is now running on http://localhost:${APP_PORT}`)
})
