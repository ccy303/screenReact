const path = require('path')
const webpack = require('webpack')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i,
        options: {
          esModule: false,
          // limit: 10000,
        },
        loader: 'url-loader',
      },
      {
        test: /\.(css|less)$/,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
              },
            },
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  javascriptEnabled: true,
                },
                sourceMap: true,
              },
            },
          ],
        }),
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          minetype: 'image/svg+xml',
        },
      },
      {
        test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
        use: 'url-loader',
      },
    ],
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
    alias: {
      '@': path.join(__dirname, '../src'),
      dw: path.join(__dirname, '../src/dw'),
      assets: path.join(__dirname, '../src/assets'),
      mock: path.join(__dirname, '../mock'),
      // react: path.join(__dirname, '../node_modules/react'),
      // 'react-dom': path.join(__dirname, '../node_modules/react-dom'),
    },
  },

  plugins: [
    new ExtractTextPlugin({
      filename: 'index.css',
      disable: false,
      allChunks: true,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    // new MiniCssExtractPlugin({
    //   filename: 'index.css',
    // }),
  ],
}
