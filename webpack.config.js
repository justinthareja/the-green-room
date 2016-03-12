var webpack = require('webpack');
var path = require('path');

var APP_DIR = path.join(__dirname, '/client/app');
var BUILD_DIR = path.join(__dirname, '/client/build/dist');
var TEST_DIR = path.join(__dirname, '/client/test');

var config = {
  entry: [
    'babel-polyfill',
    APP_DIR + '/index.js'
  ],
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module: {
    noParse: [
      /node_modules\/sinon\//
    ],
    loaders : [
      {
        test: /\.jsx?$/,
        loader: 'babel',
        include: [APP_DIR, TEST_DIR]
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass!',
        include: [APP_DIR]
      },
      {
        test: /\.json$/,
        loader: 'json',
        include: [APP_DIR]
      }
    ]
  },
  resolve: {
    root: APP_DIR,
    extensions: ['', '.js', '.jsx'],
    alias: {
      'sinon': 'sinon/pkg/sinon'
    }
  },
  externals: {
    'jsdom': 'window',
    'cheerio': 'window',
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
}

module.exports = config

