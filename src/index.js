const { distros, get } = require('./distro');
const { getPackageManager } = require('./pkgManagers.js');

const name = () => get('NAME');
const v = () => get('VERSION_ID');
const isRoot = () => (process.getuid && process.getuid() === 0) || false;
const sudo = () => (isRoot() ? '' : 'sudo ');
const getPM = (operation = 'install') => getPackageManager(name(), operation, v());

const replacePMByDistro = (cmd) => {
  const replacerInstall = getPM('install');
  const replacerUpdate = getPM('update');
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
    );
};

module.exports = { isRoot, sudo, name, v, distros, get, getPM, replacePMByDistro };
