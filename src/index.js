const { distros, get } = require('./distro');
const { getPackageManager } = require('./pkgManagers.js');

const name = () => get('NAME');
const v = () => get('VERSION_ID');
const isRoot = () => (process.getuid && process.getuid() === 0) || false;
const sudo = () => (isRoot() ? '' : 'sudo ');
const getPM = (operation = 'install') => getPackageManager(name(), operation, v());

module.exports = { isRoot, sudo, name, v, distros, get, getPM };
