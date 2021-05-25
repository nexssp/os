const os = require('../../lib/os')
const os1 = new os()

// Just checking if functions works

// Check path works also on WSL when wsl is passed
// console.log(os1.checkPath('wsl bash')) // commented in case wsl is not installed
console.log(os1.checkPath('wsl bash'))
// While where will check where the wsl is..
console.log(os1.where('cmd'))
console.log(os1.install('nodejs', { dry: true }))
console.log(os1.search('nodejs', { dry: true }))
console.log(os1.uninstall('nodejs', { dry: true }))
console.log(os1.update('nodejs', { dry: true }))
console.log(os1.distros)
console.log(os1.isRoot())
console.log(os1.sudo())
console.log(os1.name())
console.log(os1.v())

console.log(os1.tags())
console.log(os1.pathWinToLinux('C:/x/y/z'))
console.log(os1.getShell())
console.log(os1.getPackageManager('install', os1.distros.FREEBSD))
console.log(os1.replacePMByDistro('apt-get install'))
