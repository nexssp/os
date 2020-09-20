# @nexssp/os

Detect Linux distro name and version, check if user is root, and some other info

## Examples

```js
const os = require('@nexssp/os');

// Distros
console.log('isRoot: ', os.isRoot()); // true or false
console.log('name: ', os.name()); // eg. Ubuntu
console.log('get("name"): ', os.get('NAME')); // eg. Ubuntu
console.log('v: ', os.v()); // eg. 18.04
console.log('get("VERSION_ID"): ', os.get('VERSION_ID')); // eg. 18.04
console.log('get("VERSION_IDxxx"): ', os.get('VERSION_IDxxx')); // undfinded
console.log('get()', os.get()); // display all available data - depended of Linux distro

// Package managers
console.log('getPM(install):', os.getPM()); // Displays install command
console.log('getPM(update):', os.getPM('update')); // Displays update command
```
