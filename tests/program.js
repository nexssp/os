const os = require('../legacy') // will be loaded like @nexssp/os/legacy to keep 1.x versions functionality

// Distros
console.log('distrosList', os.distros)
console.log('isRoot: ', os.isRoot())
console.log('name: ', os.name())
console.log('get("name"): ', os.get('NAME'))
console.log('v: ', os.v())
console.log('get("VERSION_ID"): ', os.get('VERSION_ID'))
console.log('get("VERSION_IDxxx"): ', os.get('VERSION_IDxxx')) // does not exist so nothing is return
console.log('get()', os.get()) // display all available data - different for each distros

// Example
// DISTRIB_ID: 'Ubuntu',
// DISTRIB_RELEASE: '18.04',
// DISTRIB_CODENAME: 'bionic',
// DISTRIB_DESCRIPTION: 'Ubuntu 18.04.5 LTS',
// NAME: 'Ubuntu',
// VERSION: '18.04.5 LTS (Bionic Beaver)',
// ID: 'ubuntu',
// ID_LIKE: 'debian',
// PRETTY_NAME: 'Ubuntu 18.04.5 LTS',
// VERSION_ID: '18.04',
// HOME_URL: 'https://www.ubuntu.com/',
// SUPPORT_URL: 'https://help.ubuntu.com/',
// BUG_REPORT_URL: 'https://bugs.launchpad.net/ubuntu/',
// PRIVACY_POLICY_URL: 'https://www.ubuntu.com/legal/terms-and-policies/privacy-policy',
// VERSION_CODENAME: 'bionic',
// UBUNTU_CODENAME: 'bionic'

console.log('getShell() - your OS Shell', os.getShell()) // display current OS
console.log('getShell(ALPINE)', os.getShell(os.distros.ALPINE)) // defined OS Shell
console.log('getShell(MACOS)', os.getShell(os.distros.MACOS)) // defined OS Shell
// Package managers
console.log('getPM(install):', os.getPM()) // Displays install command
console.log('getPM(update):', os.getPM('update')) // Displays update command
console.log('getPM(uninstall):', os.getPM('uninstall')) // Displays update command
console.log('getPM(search):', os.getPM('search')) // Displays update command
console.log('tags(prefix)', os.tags('prFX:')) // [ 'prFX:WINDOWS10', 'prFX:WINDOWS' ]
// Sudo - shows when there is no admin, handy to write automations on eg. docker containers
console.log(`${os.sudo()}apt-get install -y mypackage`)
console.log(
  `Replaces apt install/update/uninstall to the right for distribution: ${os.replacePMByDistro(
    'apt-get install -y mypackage'
  )}`
)

console.log('getShell() - your OS Shell', os.getShell()) // display current OS eg /bin/bash
console.log(
  `pathWinToLinux("C:\\Users\\mapoart\\testok"):`,
  os.pathWinToLinux('C:\\Users\\mapoart\\testok')
) // /mnt/c/Users/mapoart/xxxxxxx
