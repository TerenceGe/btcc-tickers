var webpack = require('webpack')
var path = require('path')
var precss = require('precss')
var autoprefixer = require('autoprefixer')
var ExtractTextPlugin = require("extract-text-webpack-plugin")
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var fs = require("fs")

var isLocal = function() {
  return !process.env.DEPOY_ENV || process.env.DEPOY_ENV === 'development'
}

var plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', isLocal() ? 'vendor.bundle.js' : 'vendor.bundle.[hash].js'),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production'),
      DEPOY_ENV: JSON.stringify(process.env.DEPOY_ENV || 'development')
    }
  }),
  new CleanWebpackPlugin(['static'], {
    root: path.join(__dirname),
    verbose: true,
    dry: false
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: false,
    mangle: false,
    compress: {
      warnings: false
    },
    output: {
      comments: false
    }
  }),
  new ExtractTextPlugin(isLocal() ? 'bundle.css' : 'bundle.[hash].css', { allChunks: true }),
  new HtmlWebpackPlugin({
    inject: false,
    template: 'index.ejs',
    title: '',
    appMountId: 'root',
    mobile: true
  }),
  function () {
    this.plugin("done", function (stats) {
      if(isLocal()) {
        return
      }
      var replaceInFile = function (filePath, toReplace, replacement) {
        var replacer = function (match) {
          console.log('Replacing in %s: %s => %s', filePath, match, replacement)
          return replacement
        }
        var str = fs.readFileSync(filePath, 'utf8')
        var out = str.replace(new RegExp(toReplace, 'g'), replacer)
        fs.writeFileSync(filePath, out)
      }
      var hash = stats.hash
      replaceInFile(path.join(__dirname, './static', 'index.html'),
        '/vendor.bundle.',
        '/btcc-tickers/vendor.bundle.'
      )
      replaceInFile(path.join(__dirname, './static', 'index.html'),
        '/bundle.',
        '/btcc-tickers/bundle.'
      )
      replaceInFile(path.join(__dirname, './static', 'index.html'),
        '<base href="/" />',
        '<base href="/btcc-tickers" />'
      )
      replaceInFile(path.join(__dirname, './static', 'bundle.' + hash + '.css'),
        '/fonts/',
        '/btcc-tickers/fonts/'
      )
    })
  }
]

if(isLocal()) {
  plugins.splice(3, 1);
}

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    jsx: './index.js',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'intl',
      'intl/locale-data/jsonp/en.js',
      'intl/locale-data/jsonp/zh.js',
      'react-intl',
      'react-cookie'
    ]
  },
  output: {
    jsonpFunction: 'btccAccountWebpackJsonp',
    path: path.join(__dirname, './static'),
    filename: isLocal() ? 'bundle.js' : 'bundle.[hash].js',
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        include: /client/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&sourceMap&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss-loader')
      },
      {
        test: /\.css$/,
        exclude: /client/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'babel-loader'
        ]
      },
      {
        test : /\.(ttf|eot|otf|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader : 'url-loader?limit=1024&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ico|png|jpg)$/,
        loader: 'url-loader?limit=10240&name=images/[name]-[hash:base64:5].[ext]'
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  postcss: function () {
    return {
        defaults: [precss, autoprefixer]
    };
  },
  plugins: plugins,
  devServer: {
    contentBase: './client',
    hot: true
  }
}
