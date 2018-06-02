var webpack = require('webpack');
var HtmlPlugin = require('html-webpack-plugin');
var path = require('path');
var fs = require('fs');

module.exports = {
  entry: './app/main/main.js',
  target: 'node',
  mode: 'development',
  output: {
    path: `${__dirname}/build`,
    filename: 'main.bundle.js'
  },
  node: {
    __dirname: false
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: './app/index.template.html',
      filename: 'main.html'
    })
  ]
};