var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  context: __dirname,
  devtool: "source-map",
  entry: {
    bundle: __dirname + '/src/js/app.js'
  },
  output: {
    path: __dirname + "/assets/",
    filename: "[name].js"
  },
  module: {
      rules: [
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader'] })
        },
        {
          test: /\.scss$/,
          use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: ['css-loader','autoprefixer-loader', 'sass-loader'] })
        }, 
        {
          test: /\.woff2?$|\.ttf$|\.eot$/,
          loader: "file-loader?name=./fonts/[name].[ext]"
        },
        {
          test: /\.svg$|\.png|\.jpe?g|\.gif$/,
          loader: "file-loader?name=./img/[name].[ext]"
        }
      ]
  },
  plugins: [
        new ExtractTextPlugin({
          filename: '[name].css',
          disable: false,
          allChunks: true
        }),
        new CopyWebpackPlugin([
            { from: './src/js/ofi.min.js', tp: './assets/ofi.min.js' }
        ])
  ]
};