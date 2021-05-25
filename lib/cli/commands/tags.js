const { cli } = require('../cli')
module.exports = (command, args) => {
  const { nexssOS1 } = require('../../config/os-config')
  const { remove } = require('@nexssp/extend/array')
  function di(...args) {
    _log.di(`@os @cli @${command}: `, ...args)
  }
  const _log = require('@nexssp/logdebug')
  let info = nexssOS1.tags()
  let json
  if (args.includes('--json')) {
    args = remove(args, '--json')
    json = true
    di('json enabled.')
  }
  if (args[0]) {
    if (!Object.keys(info).includes(args[0])) {
      console.log('For this OS only available:')
      console.log(Object.keys(info))
      return
    }

    info = info[`${args[0]}`]
  }

  if (json) {
    console.log(JSON.stringify(info))
  } else {
    console.log(info)
  }
}
