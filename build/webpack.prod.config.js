const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const baseConfig = require('./webpack.base.config.js')

const prodConfig = merge(baseConfig, {
  // entry: path.resolve(__dirname, '../src/dw/views/ViewItem/index.tsx'),
  entry: path.resolve(__dirname, '../src/dw/main.js'),
  output: {
    filename: 'index.js',
    path: path.join(__dirname, `../echartReact`),
  },
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
  plugins: [new CleanWebpackPlugin(), new webpack.HashedModuleIdsPlugin()],
})

module.exports = prodConfig
