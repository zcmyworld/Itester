let webpack = require('webpack');
let path = require('path');


module.exports = {
  entry: {
    bundle: ['./views/components/app.js']
  },
  output: {
    path: path.join(__dirname, 'views'),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['react']
        }
      },
      {
        test: /\.json$/, loader: 'json-loader'
      }
    ]
  }
}