const os = require('../../lib/index')
const os1 = new os()
const { execSync } = require('child_process')
const nexssOSBinPath = require('path').resolve(__dirname, '../../bin/nexssp-os.js')
const releaseData = execSync(`node ${nexssOSBinPath} env`).toString().trim()
console.log(releaseData)
// Just checking if functions works

// Check path works also on WSL when wsl is passed
// console.log(os1.checkPath('wsl bash')) // commented in case wsl is not installed
// While where will check where the wsl is..
if (process.platform !== 'darwin') {
  if (process.platform === 'win32') {
    console.log('Where cmd: ', os1.where('cmd'))
    console.log('wsl bash: ', os1.checkPath('wsl bash'))
  }
} else {
  console.log('macOS brew: ', os1.where('brew'))
}

console.log('Current OS: ', os1.name(), os1.v())

console.log(os1.install('nodejs', { dry: true }))
console.log(os1.search('nodejs', { dry: true }))
console.log(os1.uninstall('nodejs', { dry: true }))
console.log(os1.update('nodejs', { dry: true }))
console.log(os1.distros)

console.log('isRoot(): ', os1.isRoot())
console.log('sudo():', os1.sudo())
console.log(os1.name())
console.log('v:', os1.v())

console.log('tags: ', os1.tags())
console.log(os1.pathWinToLinux('C:/x/y/z'))
console.log('getShell:', os1.getShell())
console.log('FREEBSD example installer: ', os1.getPackageManager('install', os1.distros.FREEBSD))
console.log(os1.replacePMByDistro('apt-get install'))
