const path = require('path')
const webpack = require('webpack');

module.exports = {
    entry: {
        app: './src/App.jsx',
        vendor: ['react', 'react-dom', 'whatwg-fetch']
    },
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'static')
    },
    plugins:[
        new webpack.optimize.CommonsChunkPlugin({name: 'vendor', filename: 'vendor.bundle.js'})
    ],
    module: {
        rules: [
            {
                test: /\.jsx$/,
                loader: 'babel-loader'
            }
        ]
    }
}