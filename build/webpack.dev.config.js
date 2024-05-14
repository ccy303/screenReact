const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.resolve(__dirname, '../public/index.html'),
})

const devConfig = merge(baseConfig, {
  mode: 'development',
  entry: path.resolve(__dirname, '../src/index.tsx'),
  devtool: '#source-map',
  // watch: true,
  // watchOptions: {
  //   aggregateTimeout: 500,
  //   poll: 1000,
  //   ignored: /node_modules/,
  // },
  devServer: {
    host: '0.0.0.0',
  },
  plugins: [htmlWebpackPlugin],
})

module.exports = devConfig
