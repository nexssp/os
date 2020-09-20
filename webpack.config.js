const path = require('path');
const webpack = require('webpack');
const packageJson = require('./package.json');

module.exports = {
  entry: {
    os: './src/index.js',
  },
  target: 'node',
  mode: 'production',
  optimization: {
    minimize: true,
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        exclude: /(node_modules|dist)/,
        test: /\.js$/,
      },
    ],
  },
  plugins: [
    new webpack.BannerPlugin({
      banner: `#!/usr/bin/env node
      "use strict"`,
      raw: true,
      include: 'cli',
    }),
  ],
};
