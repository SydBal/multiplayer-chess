// Webpack config shared by production and development environment s
const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../'),
  resolve: {
    alias: {
      '@SPA': path.resolve(__dirname, '../spa'),
      '@Components': path.resolve(__dirname, '../spa/components'),
      '@Routes': path.resolve(__dirname, '../spa/routes'),
      '@Connections': path.resolve(__dirname, '../spa/connections'),
      '@Context': path.resolve(__dirname, '../spa/context')
    }
  },
  entry: {
    app: './spa/index.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/env',
              '@babel/react'
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-proposal-class-properties'
            ]
          }
        }
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      },
      {
        test: /\.(png|jpg|gif|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}
          }
        ]
      }
    ]
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../public'),
    publicPath: '/'
  }
}
