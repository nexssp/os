const { distros } = require('./distro');

// Linux package managers
const pms = {
  APT: {
    install: 'apt install -y',
    update: 'apt update -y',
    uninstall: 'apt remove -y',
  },
  YUM: {
    install: 'yum install -y',
    update: 'yum update -y',
    uninstall: 'yum remove -y',
  },
  DNF: {
    install: 'dnf install -y',
    update: 'dnf update -y',
    uninstall: 'dnf uninstall -y',
  },
  APK: {
    install: 'apk add',
    update: 'apk update',
    uninstall: 'apk del',
  },
  PACMAN: {
    install: 'pacman -S --noconfirm',
    update: 'pacman -Syu --noconfirm',
    uninstall: 'pacman -R --noconfirm',
  },
  ZYPPER: {
    install: 'zypper -n install',
    update: 'zypper -n update',
    uninstall: 'zypper -n remove',
  },
  SCOOP: {
    install: 'scoop install',
    update: 'scoop update',
    uninstall: 'scoop uninstall',
  },
};

const getPackageManager = (distro, operation = 'install', version) => {
  switch (distro) {
    case 'Windows':
      return pms.SCOOP[operation];
      break;
    case distros.ORACLE:
      if (version * 1 >= 8 || !version) {
        // TODO: recognize the slim version
        return pms.DNF[operation];
      } else {
        return pms.YUM[operation];
      }
    case distros.ALPINE:
      return pms.APK[operation];
    case distros.ARCH:
      return pms.PACMAN[operation];
    case distros.FEDORA:
      return pms.DNF[operation];
    case distros.AMAZON:
    case distros.CENTOS:
    case distros.RHEL:
      return pms.YUM[operation];
    case distros.SUSE_LEAP:
    case distros.SUSE_TUMBLEWEED:
      return pms.ZYPPER[operation];
    case distros.UBUNTU:
    default:
      return pms.APT[operation];
  }
};
module.exports = { packageManagers: pms, getPackageManager };
