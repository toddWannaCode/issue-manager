const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './src/App.jsx',
    vendor: ['babel-polyfill', 'react', 'react-dom', 'whatwg-fetch', 'react-router-dom'],
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, 'static'),
    compress: true,
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
    historyApiFallback: true
  },
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'static'),
  },
  devtool: 'eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
    }),

    new HTMLWebpackPlugin({
      template: './src/index.html',
    }),

    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
    ],
  },
};
