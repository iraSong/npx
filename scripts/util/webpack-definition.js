var extend = require('extend')
var config = require('../../config.json')

function formatDefinitions(obj) {
  Object.keys(obj).forEach(function(k) {
    var v = obj[k]
    var typeV = Object.prototype.toString.call(v)
    switch (typeV) {
      case '[object Number]':
      case '[object String]': // define plugin 把 string 当做可执行代码
        obj[k] = JSON.stringify(v)
        break
      case '[object Object]':
        obj[k] = formatDefinitions(v)
        break
      default:
    }
  })
  return obj
}

module.exports = function() {
  var env = process.env.NODE_ENV
  var defaultConfig = config['default']
  var envConfig = extend(true, {}, {
    'process.env': {
      NODE_ENV: env || 'production'
    }
  }, defaultConfig, config[env] || {}, {
    version: Date.now()
  })
  envConfig = formatDefinitions(envConfig)
  return envConfig
}
