const { parse } = require('path');

const cache = {};

// Later implement async function
// const osRelease = async (item, callback) => {
//   if (cache[item]) {
//     return process.nextTick(() => callback(null, cache[item]));
//   }
//   const { exec } = require('child_process');
//   const results = await exec('cat /etc/*release').toString().trim();
//   cache[item] = fileContent;
//   return results;
// };

const osReleaseSync = () => {
  if (process.platform !== 'win32') {
    const { execSync } = require('child_process');
    return execSync('cat /etc/*release').toString().trim();
  }
};

module.exports.get = (item) => {
  const releaseData = osReleaseSync();
  if (releaseData) {
    const parsed = Array.from(
      releaseData.matchAll(/^(?<key>[A-Z_)]+)="?(?<value>.*)".?$/gm)
    ).reduce(
      (acc, e) => ({
        ...acc,
        [e.groups.key]: e.groups.value,
      }),
      {}
    );

    if (item) {
      return parsed[item];
    }

    return parsed;
  }
};

module.exports.distros = {
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
  UBUNTU: 'UBUNTU',
};
