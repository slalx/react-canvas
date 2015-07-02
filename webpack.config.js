
var webpack = require('webpack');

//提取公共代码的插件
var commonsPlugin =
  new webpack.optimize.CommonsChunkPlugin("commons.js");

module.exports = {
  cache: true,

  watch: true,

  entry: {
    'page1': './examples/page1/index.js',
    'page2': './examples/page2/index.js'
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader!transform/cacheable?envify' },
      { test: /\.html$/, loader: "html-loader" },
      { test: "\.jpg$", loader: "file-loader" },
      { test: "\.png$", loader: "url-loader?mimetype=image/png" }
    ],
    postLoaders: [
      { loader: "transform?brfs" }
    ]
  },

  resolve: {
    root: __dirname,
    alias: {
      'react-canvas': 'lib/ReactCanvas.js'
    }
  },

  //配置提取公共代码的插件
  plugins: [commonsPlugin]

};
