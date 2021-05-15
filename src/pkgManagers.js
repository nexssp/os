const { distros } = require('./distro');

// Package managers for each OS
const pms = {
  APK: {
    install: 'apk add',
    update: 'apk update',
    uninstall: 'apk del',
    search: 'apk search',
  },
  APT: {
    install: 'apt-get install -y',
    update: 'apt-get update -y',
    uninstall: 'apt-get remove -y',
    search: 'apt-cache search',
  },
  DNF: {
    install: 'dnf install -y',
    update: 'dnf update -y',
    uninstall: 'dnf remove -y',
    search: 'dnf search',
  },
  NIX: {
    install: 'nix-shell -p',
    update: 'nix-channel --update',
    uninstall: 'nix-store --delete',
    search: 'nix search',
  },
  PACMAN: {
    install: 'pacman -S --noconfirm',
    update: 'pacman -Syu --noconfirm',
    uninstall: 'pacman -R --noconfirm',
    search: 'pacman -Ss',
  },
  SCOOP: {
    install: 'scoop install',
    update: 'scoop update',
    uninstall: 'scoop uninstall',
    search: 'scoop search',
  },
  YUM: {
    install: 'yum install -y',
    update: 'yum update -y',
    uninstall: 'yum remove -y',
    search: 'yum search',
  },
  ZYPPER: {
    install: 'zypper -n install',
    update: 'zypper -n update',
    uninstall: 'zypper -n remove',
    search: 'zypper search', // or se
  },
};

const getPackageManager = (distro, operation = 'install', version) => {
  switch (distro) {
    case distros.WINDOWS:
      return pms.SCOOP[operation];
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
      if (version * 1 >= 22 || !version) {
        return pms.DNF[operation];
      } else {
        return pms.YUM[operation];
      }
    case distros.AMAZON_AMI:
    case distros.AMAZON:
    case distros.CENTOS:
    case distros.RHEL:
      return pms.YUM[operation];
    case distros.SUSE_LEAP:
    case distros.SUSE_TUMBLEWEED:
      return pms.ZYPPER[operation];
    case distros.NIXOS:
      return pms.NIX[operation];
    case distros.UBUNTU:
      return pms.APT[operation];
    default:
      return pms.APT[operation];
  }
};
module.exports = { packageManagers: pms, getPackageManager };
