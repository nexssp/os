module.exports = (_, args) => {
  const { nexssOS1 } = require('../../config/os-config')
  const { remove } = require('@nexssp/extend/array')
  let all
  if (args.includes('--all')) {
    args = remove(args, '--all')
    all = true
  }
  let dry
  if (args.includes('--dry')) {
    args = remove(args, '--dry')
    dry = true
  }

  console.log(nexssOS1.where(args.join(' '), { all, dry }))
}
