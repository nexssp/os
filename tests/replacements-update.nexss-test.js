let path = require('path')
const os = require('../legacy')
const distros = os.distros
distros.DEFAULT = 'somedefault'
let dostrosTests = []

Object.values(distros).forEach((el) => {
  const distName = el
  const version = 7
  const exp = os.replacePMByDistro('apt-get update -y abc', distName, version)

  if (distName === 'Windows') {
    dostrosTests.push({
      type: 'equal',
      params: [exp, 'scoop update abc'],
    })
  } else {
    switch (distName) {
      case distros.ORACLE:
        if (version * 1 >= 8 || !version) {
          // TODO: recognize the slim version
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'dnf update -y abc'],
          })
        } else {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'yum update -y abc'],
          })
        }
        break
      case distros.ALPINE:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'apk update abc'],
        })
        break
      case distros.ARCH:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'pacman -Syu --noconfirm abc'],
        })
        break
      case distros.FEDORA:
        if (version * 1 >= 22 || !version) {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'dnf update -y abc'],
          })
        } else {
          dostrosTests.push({
            type: 'equal',
            params: [exp, 'yum update -y abc'],
          })
        }
        break
      case distros.AMAZON:
      case distros.AMAZON_AMI:
      case distros.CENTOS:
      case distros.RHEL:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'yum update -y abc'],
        })
        break
      case distros.SUSE_LEAP:
      case distros.SUSE_TUMBLEWEED:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'zypper -n update abc'],
        })
        break
      case distros.NIXOS:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'nix-channel --update abc'],
        })
        break
      case distros.FREEBSD:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'pkg update abc'],
        })
        break
      case distros.GENTOO:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'emerge --update --deep abc'],
        })
        break
      case distros.MACOS:
      case distros.MACOSX:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'brew install abc'] /** Yes install not update */,
        })
        break
      case distros.UBUNTU:
      default:
        dostrosTests.push({
          type: 'equal',
          params: [exp, 'apt-get update -y abc'],
        })
        break
    }
  }
})

module.exports = {
  notEval: true,
  nexsstests: [...dostrosTests],
}
