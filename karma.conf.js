var argv = require('yargs').argv;
var path = require('path');

var webpackConfig = require('./webpack.config.js');

webpackConfig.entry = {};
webpackConfig.devtool = 'inline-source-map';

var TEST_DIR = path.join(__dirname, '/client/test');
var TEST_FILES = TEST_DIR + '/**/*.js';

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['mocha', 'chai'],
    reporters: ['spec'],
    singleRun: !argv.watch,      
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      TEST_FILES 
    ],
    preprocessors: {
      [TEST_FILES]: ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};