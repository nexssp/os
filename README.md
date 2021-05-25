# @nexssp/os

## New version 2.x

**NOTE: 1.x USERS: Also 1.x Users can still move to this version but they will need to change the way to load @nexssp/os plugin from `require("@nexssp/os")` to `require("@nexssp/os/legacy")`**

Now we are created new version with new oses.

- **NEW:** **FreeBSD** and **Gentoo** supported.
- **NEW:** terminal functions eg.

```sh
nexssp-os env
```

![image](https://user-images.githubusercontent.com/53263666/119475561-8e273e00-bd4d-11eb-9b71-cdfaa62ed84e.png)

```sh
nexssp-os get # displays information about any system (etc/os-release)
```

![Free bsd /etc/os-release](https://user-images.githubusercontent.com/53263666/119468786-10f8ca80-bd47-11eb-8c10-ea71971a3cf2.png)

```sh

nexssp-os install nodejs --dry # displays install command for your os
nexssp-os uninstall nodejs --json # uninstalls and shows result as json data
nexssp-os search nodejs
nexssp-os update nodejs
```

- **NEW:** Functions `.where()` - finds program and return path. Option to find multiple files at once with **--all** option
- **NEW API:**
  Example

```js
const nexssOS = require('@nexssp/os')
const nexssOS1 = nexssOS()

// in terminal nexssp-os install nodejs
// 2.0.7+ you can also pass string like .install('nodejs')
const result1 = nexssOS1.install(['nodejs'], { dry: true }) // dry will return  the install command for the OS the command is run
//eg for Ubuntu it will be apt-get update, for gentoo emerge, ...etc. Without dry it will execute the command displayed with dry.
const result2 = nexssOS1.uninstall(['nodejs'], { json: true }) // uninstall package - json will return json data
nexssOS1.search(['nodejs']) // search for packages
nexssOS1.update(['nodejs']) // update
```

- **NEW 1.0.30+** - `os.pathWinToLinux(path)` - converts windows path to linux -> handy with WSL automations (**W**indows **S**ubsystem for **L**inux).

_Note: This function is used in the [Nexss Programmer](https://github.com/nexssp/cli) to implement Crystal Language for Windows through WSL._

## Installation

```sh
npm i @nexssp/os
```

## Usage

```js
// For legacy functions 1.x as this. See above for 2.x
const os = require('@nexssp/os/legacy')
console.log(os.name()) // shows distro name
```

Detect `Linux` _distro name_ and version, check if user is root, and some other info. Also works for Windows showing name as `Windows` and version like `10.0.19041`

Recognize different distros and Windows versions by tags.
Example:

### New Tags

```js
// With no parameters it shows tags for the current os
console.log(nexssOS1.getTags('Ubuntu', '20.10')) // [ 'UBUNTU', 'UBUNTU20', 'UBUNTU2010' ]
console.log(nexssOS1.getTags('Ubuntu', 20.1)) // [ 'UBUNTU', 'UBUNTU20', 'UBUNTU201' ]
console.log(nexssOS1.getTags()) // [ 'WINDOWS', 'WINDOWS10', 'WINDOWS100' ] current OS tags

console.log(nexssOS1.getTags('Ubuntu', '20.10').first()) // UBUNTU
console.log(nexssOS1.getTags('Ubuntu', 20.1).second()) // UBUNTU20
console.log(nexssOS1.getTags().third()) // WINDOWS100
```

### Legacy Tags

```js
// LEGACY Tags - still works!
// For Ubuntu 18
console.log('tags(prefix)', os.tags('prFX:')) // [ 'prFX:UBUNTU18', 'prFX:UBUNTU' ]

// For Windows
console.log('tags(prefix)', os.tags('prFX:')) // [ 'prFX:WINDOWS10', 'prFX:WINDOWS' ]
```

## New

- Added Amazon Linux AMI distro and package manager setup.
- function `sudo()` which contain sudo where user is not admin and nothing if it is. It helps writing installers so automatically will add sudo if needed and for example docker containers will leave it blank. eg `${sudo()}apt-get install -y somepackage`
- function `replacePMByDistro()` which replaces default (apt-get install -y) to the host distribution. For example `${os.replacePMByDistro('apt-get install -y nexss')}`, will on Fedora replace with dnf install, on Ubuntu will not replace it as it is default, on Alpine it will be apk, on Oracle Linux yum install or dns install depends on your linux distribution...

## Distros list

```js
module.exports.distros = {
  ALPINE: 'Alpine Linux',
  AMAZON: 'Amazon Linux',
  AMAZON_AMI: 'Amazon Linux AMI',
  ARCH: 'Arch Linux',
  CENTOS: 'CentOS Linux',
  DEBIAN: 'Debian GNU/Linux',
  FREEBSD: 'FreeBSD',
  FEDORA: 'Fedora',
  GENTOO: 'Gentoo',
  MINT: 'Linux Mint',
  NIXOS: 'NixOS',
  ORACLE: 'Oracle Linux Server',
  RHEL: 'RHEL Linux',
  SUSE_LEAP: 'openSUSE Leap',
  SUSE_TUMBLEWEED: 'openSUSE Tumbleweed',
  UBUNTU: 'Ubuntu',
  WINDOWS: 'Windows',
  MACOS: 'MacOS',
}
```

## More Examples

```js
const os = require('@nexssp/os/legacy')

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
console.log('getPM(search):', os.getPM('search')) // Displays search command
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
) // /mnt/c/Users/mapoart/testok
```
