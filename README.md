# @nexssp/os

Detect `Linux` _distro name_ and version, check if user is root, and some other info. Also works for Windows showing name as `Windows` and version like `10.0.19041`

## New

- function `sudo()` which contain sudo where user is not admin and nothing if it is. It helps writing installers so automatically will add sudo if needed and for example docker containers will leave it blank. eg `${sudo()}apt install -y somepackage`

## Distros list

```js
distrosList {
    ALPINE: 'Alpine Linux',
    AMAZON: 'Amazon Linux',
    ARCH: 'Arch Linux',
    CENTOS: 'CentOS Linux',
    DEBIAN: 'Debian',
    FEDORA: 'Fedora',
    MINT: 'Mint Linux',
    ORACLE: 'Oracle Linux Server',
    RHEL: 'RHEL Linux',
    SUSE_LEAP: 'openSUSE Leap',
    SUSE_TUMBLEWEED: 'openSUSE Tumbleweed',
    UBUNTU: 'UBUNTU'
}

```

## Examples

```js
const os = require('@nexssp/os');

// Distros
console.log('distrosList', os.distros);
console.log('isRoot: ', os.isRoot()); // true or false
console.log('name: ', os.name()); // eg. Ubuntu
console.log('get("name"): ', os.get('NAME')); // eg. Ubuntu
console.log('v: ', os.v()); // eg. 18.04
console.log('get("VERSION_ID"): ', os.get('VERSION_ID')); // eg. 18.04
console.log('get("VERSION_IDxxx"): ', os.get('VERSION_IDxxx')); // undfinded
console.log('get()', os.get()); // display all available data - depended of Linux distro

// Package managers
console.log('getPM("install"):', os.getPM()); // Displays install command
console.log('getPM("update"):', os.getPM('update')); // Displays update command
```
