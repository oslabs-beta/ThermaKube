const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: process.env.NODE_ENV,
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: '/',
  },
  devServer: {
    // Required for Docker to work with dev server
    host: '0.0.0.0',
    //host: localhost,
    port: 8080,
    // match the output path
    contentBase: path.resolve(__dirname, 'dist'),
    proxy: [
      {
        context: ['/aws', '/api'],
        target: 'http://localhost:3000',
        secure: false,
      },
    ],
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|png)$/,
        use: {
          loader: 'url-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './index.html',
      filename: './index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
