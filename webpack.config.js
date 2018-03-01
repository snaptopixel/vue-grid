const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// NPM STATE
const TARGET = process.env.npm_lifecycle_event;
const BUILD = TARGET === 'build';
const TEST = TARGET === 'test' || TARGET === 'test:watch';
const DEV = TARGET === 'start';

const appPath = path.resolve(__dirname, 'src');

const common = {
  entry: {
    app: './src/index.ts'
  },
  devtool: 'inline-source-map',
  output: {
    path: '/dist',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.ts'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    modules: [
      'node_modules',
      'src',
    ]
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.styl$/,
        use: ['style-loader', {
          loader: 'css-loader',
          options: {
            modules: false
          }
        }, 'stylus-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse(DEV)),
      __BUILD__: JSON.stringify(JSON.parse(BUILD))
    }),
    new HtmlWebpackPlugin({inject: true, template: 'src/index.html'})
  ],
}

if (BUILD) {
  // TODO
  module.exports = merge.smart(common, {});
}

if (DEV) {
  // TODO
  module.exports = merge.smart(common, {});
}