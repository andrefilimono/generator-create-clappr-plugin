const path = require('path')
const webpack = require('webpack')
const version = JSON.stringify(require('./package.json').version)

const pluginName = '<%= name %>'
const pluginLibrary = '<%= className %>'

const config = {
  entry: path.resolve(__dirname, 'src/main.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    library: pluginLibrary,
    libraryTarget: 'umd',
    libraryExport: 'default'
  },
  externals: {
    clappr: {
      amd: 'clappr',
      commonjs: 'clappr',
      commonjs2: 'clappr',
      root: 'Clappr'
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      VERSION: version
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8080
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}

module.exports = (_, { mode }) => {
  if (mode === 'production') {
    config.output.filename = `${pluginName}.min.js`
    config.devtool = 'source-map'
  } else {
    config.output.filename = `${pluginName}.js`
    config.devtool = 'inline-source-map'
  }

  return config
}
