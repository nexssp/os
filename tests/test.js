const os = require('../src/');

// Distros
console.log('distrosList', os.distros);
console.log('isRoot: ', os.isRoot());
console.log('name: ', os.name());
console.log('get("name"): ', os.get('NAME'));
console.log('v: ', os.v());
console.log('get("VERSION_ID"): ', os.get('VERSION_ID'));
console.log('get("VERSION_IDxxx"): ', os.get('VERSION_IDxxx')); // does not exist so nothinis return
console.log('get()', os.get()); // display all available data - different distros, different

// Package managers
console.log('getPM(install):', os.getPM()); // Displays install command
console.log('getPM(update):', os.getPM('update')); // Displays update command
