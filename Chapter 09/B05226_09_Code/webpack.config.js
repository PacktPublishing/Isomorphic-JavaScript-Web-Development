const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve('public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  plugins: process.env.NODE_ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ] : [],

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["env", "stage-2", "react"]
          }
        }
      }
    ]
  },
  
  devtool: 'source-map'
};
