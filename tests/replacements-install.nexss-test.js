let path = require('path')
const os = require('../legacy')
const distros = os.distros
distros.DEFAULT = 'somedefault'
let dostrosTests = []

Object.values(distros).forEach((el) => {
  const distName = el
  const version = 7
  const exp = os.replacePMByDistro('apt-get install -y abc', distName, version)

  if (distName === 'Windows') {
    dostrosTests.push({
      type: 'equal',
      params: [exp, 'scoop install abc'],
    })
  } else {
    switch (distName) {
      case 'Windows':
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'scoop install abc'],
        })
        break
      case distros.ORACLE:
        if (version * 1 >= 8 || !version) {
          // TODO: recognize the slim version
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'dnf install -y abc'],
          })
        } else {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'yum install -y abc'],
          })
        }
        break
      case distros.ALPINE:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'apk add abc'],
        })

        break
      case distros.ARCH:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'pacman -S --noconfirm abc'],
        })
        break
      case distros.FEDORA:
        if (version * 1 >= 22 || !version) {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'dnf install -y abc'],
          })
        } else {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'yum install -y abc'],
          })
        }
        break
      case distros.AMAZON:
      case distros.AMAZON_AMI:
      case distros.CENTOS:
      case distros.RHEL:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'yum install -y abc'],
        })
        break
      case distros.SUSE_LEAP:
      case distros.SUSE_TUMBLEWEED:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'zypper -n install abc'],
        })
        break
      case distros.NIXOS:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'nix-shell -p abc'],
        })
        break
      case distros.FREEBSD:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'pkg install abc'],
        })
        break
      case distros.GENTOO:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'emerge abc'],
        })
        break
      case distros.UBUNTU:
      default:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'apt-get install -y abc'],
        })
        break
    }
  }
})

module.exports = {
  notEval: true,
  nexsstests: [...dostrosTests],
}
