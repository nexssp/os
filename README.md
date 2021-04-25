# @nexssp/os

## Installation

```sh
npm i @nexssp/os
```

## Usage

```js
const os = require('@nexssp/os');
console.log(os.name()); // shows distro name
```

Detect `Linux` _distro name_ and version, check if user is root, and some other info. Also works for Windows showing name as `Windows` and version like `10.0.19041`

Recognize different distros and Windows versions by tags.
Example:

```js
// For Ubuntu 18
console.log('tags(prefix)', os.tags('prFX:')); // [ 'prFX:UBUNTU18', 'prFX:UBUNTU' ]

// For Windows
console.log('tags(prefix)', os.tags('prFX:')); // [ 'prFX:WINDOWS10', 'prFX:WINDOWS' ]
```

## New

- function `sudo()` which contain sudo where user is not admin and nothing if it is. It helps writing installers so automatically will add sudo if needed and for example docker containers will leave it blank. eg `${sudo()}apt install -y somepackage`
- function `replacePMByDistro()` which replaces default (apt-get install -y) to the host distribution. For example `${os.replacePMByDistro('apt-get install -y nexss')}`, will on Fedora replace with dnf install, on Ubuntu will not replace it as it is default, on Alpine it will be apk, on Oracle Linux yum install or dns install depends on your linux distribution...

## Distros list

```js
module.exports.distros = {
  ALPINE: 'Alpine Linux',
  AMAZON: 'Amazon Linux',
  ARCH: 'Arch Linux',
  CENTOS: 'CentOS Linux',
  DEBIAN: 'Debian GNU/Linux',
  FEDORA: 'Fedora',
  MINT: 'Linux Mint',
  NIXOS: 'NixOS',
  ORACLE: 'Oracle Linux Server',
  RHEL: 'RHEL Linux',
  SUSE_LEAP: 'openSUSE Leap',
  SUSE_TUMBLEWEED: 'openSUSE Tumbleweed',
  UBUNTU: 'Ubuntu',
  WINDOWS: 'Windows',
};
```

## More Examples

```js
const os = require('@nexssp/os');

// Distros
console.log('distrosList', os.distros);
console.log('isRoot: ', os.isRoot());
console.log('name: ', os.name());
console.log('get("name"): ', os.get('NAME'));
console.log('v: ', os.v());
console.log('get("VERSION_ID"): ', os.get('VERSION_ID'));
console.log('get("VERSION_IDxxx"): ', os.get('VERSION_IDxxx')); // does not exist so nothing is return
console.log('get()', os.get()); // display all available data - different for each distros

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

console.log('getShell() - your OS Shell', os.getShell()); // display current OS
console.log('getShell(ALPINE)', os.getShell(os.distros.ALPINE)); // defined OS Shell
console.log('getShell(MACOS)', os.getShell(os.distros.MACOS)); // defined OS Shell
// Package managers
console.log('getPM(install):', os.getPM()); // Displays install command
console.log('getPM(update):', os.getPM('update')); // Displays update command
console.log('getPM(uninstall):', os.getPM('uninstall')); // Displays update command
console.log('getPM(search):', os.getPM('search')); // Displays update command
console.log('tags(prefix)', os.tags('prFX:')); // [ 'prFX:WINDOWS10', 'prFX:WINDOWS' ]
// Sudo - shows when there is no admin, handy to write automations on eg. docker containers
console.log(`${os.sudo()}apt-get install -y mypackage`);
console.log(
  `Replaces apt install/update/uninstall to the right for distribution: ${os.replacePMByDistro(
    'apt-get install -y mypackage'
  )}`
);
```
