var glob = require('glob')
var ncp = require('ncp').ncp
var mkdirp = require('mkdirp')
var path = require('path')

var filePaths = [];
['.*', '*'].forEach(function(pattern) {
  var paths = glob.sync(pattern, {
    cwd: path.join(__dirname, '..'),
    ignore: ['node_modules', 'log', 'tmp', '.git', '.DS_Store']
  })
  filePaths = filePaths.concat(paths)
})

mkdirp.sync(path.join(__dirname, '../../npx-es5'))
filePaths.forEach(function(source) {
  ncp(source, path.join('../npx-es5', source), function(err) {
    if (err) {
      return console.error(err)
    }
    console.log('copy: ' + source)
  })
})
