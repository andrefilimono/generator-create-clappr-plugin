const path = require('path')
const webpack = require('webpack')

const pluginName = '<%= name %>'
const pluginLibrary = '<%= className %>'

let outputFile = ''
let plugins = []

if (process.env.npm_lifecycle_event === 'release') {
  outputFile = `${pluginName}.min.js`
  plugins = [
    new webpack.optimize.UglifyJsPlugin({})
  ]
} else {
  outputFile = `${pluginName}.js`
}

module.exports = {
  entry: path.resolve(__dirname, 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: outputFile,
    library: pluginLibrary,
    libraryTarget: 'umd'
  },
  externals: {
    clappr: 'Clappr'
  },
  plugins: plugins,
  resolve: {
    extensions: ['.js']
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    disableHostCheck: true,
    compress: true,
    host: '0.0.0.0',
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015'],
            plugins: ['add-module-exports']
          }
        }
      }
    ]
  }
}
