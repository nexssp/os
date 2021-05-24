exports.cli = (command, args) => {
  const { remove } = require('@nexssp/extend/array')
  args = remove(args, '--debug')
  const { nSpawn } = require('@nexssp/system')

  const { nexssOS1 } = require('../config/os-config')

  const _log = require('@nexssp/logdebug')

  function di(...args) {
    _log.di(`@os @cli @${command}: `, ...args)
  }

  let dry
  if (args.includes('--dry')) {
    args = remove(args, '--dry')
    dry = true
    di('dry enabled.')
  }

  let json
  if (args.includes('--json')) {
    args = remove(args, '--json')
    json = true
    di('json enabled.')
  }

  const result = nexssOS1[`${command}`](args, { dry, json })
  if (dry || json) console.log(result)
}
