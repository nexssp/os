const { distros, get } = require('./distro');
const { getPackageManager } = require('./pkgManagers.js');
const name = () => get('NAME');
const v = () => get('VERSION_ID');
const isRoot = () => (process.getuid && process.getuid() === 0) || false;
const sudo = () => (isRoot() ? '' : 'sudo ');
const getPM = (operation = 'install', dist, version) =>
  getPackageManager(dist ? dist : name(), operation, version ? version : v());
// Unique tags per distro and version
// eg const ts = tags();
// ['Alpine Linux3','Alpine Linux']
function getKeyByValue(object, value) {
  return Object.keys(object).find((key) => object[key] === value);
}
const tags = (prefix = '') => {
  const nm = name();
  const dv = v();
  const k = getKeyByValue(distros, nm);
  return [prefix + k + parseInt(dv), prefix + k];
};
const replacePMByDistro = (cmd, distro, version) => {
  const replacerInstall = getPM('install', distro, version);
  const replacerUpdate = getPM('update', distro, version);
  const replacerUninstall = getPM('uninstall', distro, version);
  if (!cmd.replace) {
    console.error(`@nexssp/os: There was an error. command should be string, but received: `, cmd);
    process.exitCode = 1;
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
      );
  }
};

const getShell = (distro) => {
  // if no distro specified use
  if (process.platform === 'darwin') return 'zsh';
  if (!distro) distro = name();
  if (!distro && process.platform === 'win32') {
    return true;
  } else {
    switch (distro) {
      case distros.ALPINE:
        return '/bin/sh';
      default:
        return '/bin/bash';
    }
  }
};

module.exports = { isRoot, sudo, name, v, distros, get, getPM, tags, replacePMByDistro, getShell };
