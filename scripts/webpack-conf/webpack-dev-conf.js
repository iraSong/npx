/*
* @Author: dengjiayao
* @Date:   2017-12-27 13:21:05
* @Last Modified by:   dengjiayao
* @Last Modified time: 2018-02-08 17:45:41
*/
const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const { getBaseConf, getCustomConf } = require('./webpack-base-conf')

module.exports = (env, filter) => {
  let baseConfig = getBaseConf('development', filter)
  if (!baseConfig) {
    return
  }

  let customConfig = getCustomConf('development')

  Object.keys(baseConfig.entry).forEach(name => {
    baseConfig.entry[name] = [
      'react-hot-loader/patch',
      path.join(__dirname, 'webpack-dev-client'),
      baseConfig.entry[name]
    ]
  })

  return merge(
    baseConfig,
    {
      cache: true,
      devtool: '#eval-source-map',
      output: {
        publicPath: '/'
      },
      plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NoEmitOnErrorsPlugin()]
    },
    customConfig
  )
}
