const { distros, get } = require('./lib/distro')
const { getPackageManager } = require('./lib/pkgManagers.js')
const { pathWinToLinux } = require('./lib/winVsLinux')
const name = () => get('NAME')
const v = () => get('VERSION_ID')
const isRoot = () => (process.getuid && process.getuid() === 0) || false
const sudo = () => (isRoot() ? '' : 'sudo ')
const getPM = (operation = 'install', dist, version) =>
  getPackageManager(dist ? dist : name(), operation, version ? version : v())
// Unique tags per distro and version
// eg const ts = tags();
// ['Alpine Linux3','Alpine Linux']
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value)
}
const tags = (prefix = '') => {
  const nm = name()
  const dv = v()
  const k = getKeyByValue(distros, nm)
  return [
    prefix + k,
    prefix + k + parseInt(dv),
    prefix + k + parseInt(dv.replace('.', '').replace(',', '')),
  ]
}
const replacePMByDistro = (cmd, distro, version) => {
  const replacerInstall = getPM('install', distro, version)
  const replacerUpdate = getPM('update', distro, version)
  const replacerUninstall = getPM('uninstall', distro, version)
  const replacerSearch = getPM('search', distro, version)
  if (!cmd.replace) {
    console.error(`@nexssp/os: There was an error. command should be string, but received: `, cmd)
    process.exitCode = 1
  } else {
    return cmd
      .replace(
        new RegExp(
          '(?:sudo?:(.*))?(apt -y install|apt-get -y install|apt-get install -y|apt install -y|apt install|apt-get install)',
          'gs'
        ),
        replacerInstall
      )
      .replace(
        new RegExp(
          '(?:sudo?:(.*))?(apt -y update|apt-get -y update|apt-get update -y|apt update -y|apt update|apt-get update)',
          'gs'
        ),
        replacerUpdate
      )
      .replace(
        new RegExp(
          '(?:sudo?:(.*))?(apt -y remove|apt-get -y remove|apt-get remove -y|apt remove -y|apt remove|apt-get remove)',
          'gs'
        ),
        replacerUninstall
      )
      .replace(
        new RegExp(
          '(?:sudo?:(.*))?(apt -y search|apt-get -y search|apt-get search -y|apt search -y|apt search|apt-get search)',
          'gs'
        ),
        replacerSearch
      )
  }
}

const getShell = (distro) => {
  if (!distro) {
    if (process.platform === 'freebsd') return '/bin/csh'
    if (process.platform === 'darwin') return 'zsh'
    if (process.platform === 'win32') return true
    distro = name()
  }

  switch (distro) {
    case distros.ALPINE:
    case distros.AMAZON_AMI:
      return '/bin/sh'
    case distros.WINDOWS:
      return true
    case distros.MACOS:
      return '/bin/zsh'
    default:
      return '/bin/bash'
  }
}

module.exports = {
  isRoot,
  sudo,
  name,
  v,
  distros,
  get,
  getPM,
  tags,
  replacePMByDistro,
  getShell,
  pathWinToLinux,
}
