const { distros, get } = require('./distro');
const { getPackageManager } = require('./pkgManagers.js');

const name = () => get('NAME');
const v = () => get('VERSION_ID');
const isRoot = () => (process.getuid && process.getuid() === 0) || false;
const sudo = () => (isRoot() ? '' : 'sudo ');
const getPM = (operation = 'install', dist, version) =>
  getPackageManager(dist ? dist : name(), operation, version ? version : v());

const replacePMByDistro = (cmd, distro, version) => {
  const replacerInstall = getPM('install', distro, version);
  const replacerUpdate = getPM('update', distro, version);
  const replacerUninstall = getPM('uninstall', distro, version);
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
};

module.exports = { isRoot, sudo, name, v, distros, get, getPM, replacePMByDistro };
