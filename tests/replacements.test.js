let path = require('path');
const os = require('../src/index');
const distros = os.distros;
distros.DEFAULT = 'somedefault';
describe('Replacements', () => {
  test('os.replacePMByDistro(install)', (done) => {
    Object.values(distros).forEach((el) => {
      const distName = el;
      const version = 7;
      const val = os.replacePMByDistro('apt-get install -y abc', distName, version);
      const exp = expect(val);
      if (distName === 'Windows') {
        exp.toEqual('scoop install abc');
      } else {
        switch (distName) {
          case 'Windows':
            exp.toEqual('scoop install abc');
            break;
          case distros.ORACLE:
            if (version * 1 >= 8 || !version) {
              // TODO: recognize the slim version
              exp.toEqual('dnf install -y abc');
            } else {
              exp.toEqual('yum install -y abc');
            }
            break;
          case distros.ALPINE:
            exp.toEqual('apk add abc');
            break;
          case distros.ARCH:
            exp.toEqual('pacman -S --noconfirm abc');
            break;
          case distros.FEDORA:
            exp.toEqual('dnf install -y abc');
            break;
          case distros.AMAZON:
          case distros.CENTOS:
          case distros.RHEL:
            exp.toEqual('yum install -y abc');
            break;
          case distros.SUSE_LEAP:
          case distros.SUSE_TUMBLEWEED:
            exp.toEqual('zypper -n install abc');
            break;
          case distros.UBUNTU:
          default:
            exp.toEqual('apt install -y abc');
            break;
        }
      }
    });

    done();
  });

  test('os.replacePMByDistro(uninstall)', (done) => {
    Object.values(distros).forEach((el) => {
      const distName = el;
      const version = 7;
      const val = os.replacePMByDistro('apt-get remove -y abc', distName, version);
      const exp = expect(val);
      if (distName === 'Windows') {
        exp.toEqual('scoop uninstall abc');
      } else {
        switch (distName) {
          case distros.ORACLE:
            if (version * 1 >= 8 || !version) {
              // TODO: recognize the slim version
              exp.toEqual('dnf uninstall -y abc');
            } else {
              exp.toEqual('yum uninstall -y abc');
            }
            break;
          case distros.ALPINE:
            exp.toEqual('apk del abc');
            break;
          case distros.ARCH:
            exp.toEqual('pacman -R --noconfirm abc');
            break;
          case distros.FEDORA:
            exp.toEqual('dnf uninstall -y abc');
            break;
          case distros.AMAZON:
          case distros.CENTOS:
          case distros.RHEL:
            exp.toEqual('yum uninstall -y abc');
            break;
          case distros.SUSE_LEAP:
          case distros.SUSE_TUMBLEWEED:
            exp.toEqual('zypper -n remove abc');
            break;
          case distros.UBUNTU:
          default:
            exp.toEqual('apt remove -y abc');
            break;
        }
      }
    });

    done();
  });

  test('os.replacePMByDistro(update)', (done) => {
    Object.values(distros).forEach((el) => {
      const distName = el;
      const version = 7;
      const val = os.replacePMByDistro('apt-get remove -y abc', distName, version);
      const exp = expect(val);
      if (distName === 'Windows') {
        exp.toEqual('scoop uninstall abc');
      } else {
        switch (distName) {
          case distros.ORACLE:
            if (version * 1 >= 8 || !version) {
              // TODO: recognize the slim version
              exp.toEqual('dnf uninstall -y abc');
            } else {
              exp.toEqual('yum uninstall -y abc');
            }
            break;
          case distros.ALPINE:
            exp.toEqual('apk del abc');
            break;
          case distros.ARCH:
            exp.toEqual('pacman -R --noconfirm abc');
            break;
          case distros.FEDORA:
            exp.toEqual('dnf uninstall -y abc');
            break;
          case distros.AMAZON:
          case distros.CENTOS:
          case distros.RHEL:
            exp.toEqual('yum uninstall -y abc');
            break;
          case distros.SUSE_LEAP:
          case distros.SUSE_TUMBLEWEED:
            exp.toEqual('zypper -n remove abc');
            break;
          case distros.UBUNTU:
          default:
            exp.toEqual('apt remove -y abc');
            break;
        }
      }
    });

    done();
  });
});
