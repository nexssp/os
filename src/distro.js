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
  if (process.platform === 'win32') {
    const data = {
      NAME: 'Windows',
      VERSION_ID: require('os').release(),
    };
    return item ? data[item] : data;
  } else {
    const releaseData = osReleaseSync();

    if (releaseData) {
      const parsed = releaseData
        .split(/\r?\n/)
        .map((e) => {
          var s = e.split('=');
          return { key: [s[0]], value: s[1] };
        })
        .reduce(
          (acc, e) => ({
            ...acc,
            [e.key]: e.value && e.value.replace(/(^")|("$)/g, ''),
          }),
          {}
        );
      // Fedora didn't work below so did it much easier way by splits
      // const parsed = Array.from(
      //   releaseData.matchAll(/^.?(?<key>[A-Z_)]+)="?(?<value>.*)".?$/gm)
      // ).reduce(
      //   (acc, e) => ({
      //     ...acc,
      //     [e.groups.key]: e.groups.value,
      //   }),
      //   {}
      // );
      // console.log('PARSED!!!', parsed);
      if (item) {
        return parsed[item];
      }
      return parsed;
    }
  }
};

module.exports.distros = {
  ALPINE: 'Alpine Linux',
  AMAZON: 'Amazon Linux',
  ARCH: 'Arch Linux',
  CENTOS: 'CentOS Linux',
  DEBIAN: 'Debian',
  FEDORA: 'Fedora',
  MINT: 'Linux Mint',
  ORACLE: 'Oracle Linux Server',
  RHEL: 'RHEL Linux',
  SUSE_LEAP: 'openSUSE Leap',
  SUSE_TUMBLEWEED: 'openSUSE Tumbleweed',
  UBUNTU: 'Ubuntu',
};
