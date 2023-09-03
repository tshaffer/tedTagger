/* eslint-disable @typescript-eslint/no-var-requires */
var webpack = require('webpack');
var CopyWebpackPlugin =  require('copy-webpack-plugin');

module.exports = {
  mode: 'development',

  entry: './src/index.tsx',

  output: {
    libraryTarget: 'umd',
    publicPath: './build/',
    filename: 'bundle.js',
    path: __dirname + '/build'
  },

  devtool: 'inline-source-map',

  target: 'electron-renderer',

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json', '.css'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    new CopyWebpackPlugin([
      { from: '/Users/tedshaffer/Documents/Projects/tedTagger/build/bundle.js', to: '/Users/tedshaffer/Documents/Projects/tedTaggerServer/public/build' },
      { from: '/Users/tedshaffer/Documents/Projects/tedTagger/build/bundle.js.map', to: '/Users/tedshaffer/Documents/Projects/tedTaggerServer/public/build' },
    ]),
  ]
};
