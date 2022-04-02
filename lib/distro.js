const cache = {}

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
  const { execSync } = require('child_process')
  if (process.platform === 'freebsd') {
    return execSync('freebsd-version').toString().trim()
  } else if (process.platform === 'darwin') {
    return execSync('sw_vers').toString().trim()
  } else if (process.platform !== 'win32') {
    return execSync('cat /etc/*release').toString().trim()
  }
}

module.exports.get = (item) => {
  const platform = process.platform
  if (platform === 'win32') {
    const data = {
      NAME: 'Windows',
      VERSION_ID: require('os').release(),
    }
    return item ? data[item] : data
  } else if (platform === 'freebsd') {
    const freeBSDData = osReleaseSync()
    const Version_ID = freeBSDData.match(/\d*.\d*/)[0]
    const data = {
      ID: 'freebsd',
      NAME: 'FreeBSD',
      VERSION: freeBSDData,
      VERSION_ID: Version_ID,
      PRETTY_NAME: `FreeBSD ${Version_ID}`,
      HOME_URL: 'https://freebsd.org/',
      BUG_REPORT_URL: 'https://bugs.freebsd.org/bugzilla/',
    }
    return item ? data[item] : data
  } else {
    const releaseData = osReleaseSync()

    if (releaseData) {
      const splitted = releaseData.split(/\r?\n/)
      const parsed = splitted
        .map((e) => {
          var s = e.split('=')
          return { key: [s[0]], value: s[1] }
        })
        .reduce(
          (acc, e) => ({
            ...acc,
            [e.key]: e.value && e.value.replace(/(^")|("$)/g, ''),
          }),
          {}
        )
      // GENTOO does not have VERSION_ID, we parse data to get it.
      if (!parsed.VERSION_ID && releaseData.indexOf('Gentoo Base System release') > -1) {
        parsed.VERSION_ID = splitted[0].match(/\d*.\d*$/)[0]
      }

      if (item) {
        return parsed[item]
      }
      return parsed
    }
  }
}

module.exports.distros = {
  ALPINE: 'Alpine Linux',
  AMAZON: 'Amazon Linux',
  AMAZON_AMI: 'Amazon Linux AMI',
  ARCH: 'Arch Linux',
  CENTOS: 'CentOS Linux',
  DEBIAN: 'Debian GNU/Linux',
  FREEBSD: 'FreeBSD',
  FEDORA: 'Fedora',
  GENTOO: 'Gentoo',
  MINT: 'Linux Mint',
  NIXOS: 'NixOS',
  ORACLE: 'Oracle Linux Server',
  RHEL: 'RHEL Linux',
  SUSE_LEAP: 'openSUSE Leap',
  SUSE_TUMBLEWEED: 'openSUSE Tumbleweed',
  UBUNTU: 'Ubuntu',
  WINDOWS: 'Windows',
  MACOS: 'MacOS',
}
