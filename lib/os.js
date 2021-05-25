'use strict'
/* eslint-disable space-before-function-paren, comma-dangle */

/**
 * Copyright © 2018-2021 Nexss.com / Marcin Polak mapoart@gmail.com. All rights reserved.
 * This source code is governed by MIT license, please check LICENSE file.
 */
/**
 * Creates functionality for Nexss Languages.
 * @constructor
 * @param {string} cache
 * @param {string} progress - It will show progress of the installations eg. git
 */

function nexssOS({ cache, progress, cacheDuration } = {}) {
  const { execSync } = require('child_process')
  const { remove } = require('@nexssp/extend')
  let _paths = []
  let _fs
  let _path
  let _log
  const _cache = cache
  const _progress = progress
  let _started
  let _cacheDuration = !!cacheDuration || '1w'

  const { bold, red, yellow, green } = require('@nexssp/ansi')

  const start = () => {
    if (_started) {
      return _paths
    }
    _fs = require('fs')
    _path = require('path')
    _log = require('@nexssp/logdebug')
    // == We start a cache
    if (_cache) {
      _cache.start()
    }

    return _paths
  }

  const {
    isRoot,
    sudo,
    name,
    v,
    distros,
    get,
    getPM,
    tags,
    replacePMByDistro,
    getShell,
    pathWinToLinux,
  } = require('../legacy')

  const { cmd } = require('./cmd')

  function checkPath(pkg) {
    if (!pkg) {
      throw new Error('Specify the program you wish to find the path.')
    }
    if (pkg.startsWith('wsl')) {
      const wsl = where('wsl')
      if (!wsl) {
        console.log(`${bold('wsl')} command has not been found.`)
        console.log(
          `For this command you need to have ${bold('Windows Subsystem Linux (WSL)')} enabled.`
        )
        console.log(
          `More information you can find here: ${bold(
            'https://github.com/nexssp/cli/wiki/WSL-(Windows-Subsystem-Linux)'
          )}`
        )
        process.exit(1)
      }

      return checkWSLCommand(pkg.substring(4))
    } else {
      return where(pkg)
    }
  }

  function checkWSLCommand(command) {
    try {
      const r = execSync(`wsl which ${command}`, {
        stdio: ['ignore', 'pipe', 'ignore'],
      })
      return r.toString().trim()
    } catch (error) {
      // console.log("command not found", error);
    }
  }

  function where(command, { all, dry } = {}) {
    const w = process.platform === 'win32' ? 'cmd /c where' : 'command -v'

    return cmd(w, { all, dry })(command)
  }

  const { nSpawn } = require('@nexssp/system')
  function nSpawnCommand(command, options) {
    const pm = getPM(command)
    return (args) => {
      if (!Array.isArray()) {
        args = [args]
      }
      // make it better below..
      if (!options.dry) {
        args = `${args.join(' ')}`
        return nSpawn(`${pm} ${args}`, options)
      } else {
        args = remove(args)
        args = `${args.join(' ')}`
        return `${pm} ${args}`
      }
    }
  }

  function install(args, { dry, json } = {}) {
    let stdio = 'inherit'
    if (json) {
      stdio = 'pipe'
    }

    return nSpawnCommand('install', { stdio, dry })(args)
  }

  function uninstall(args, { dry, json } = {}) {
    let stdio = 'inherit'
    if (json) {
      stdio = 'pipe'
    }

    return nSpawnCommand('uninstall', { stdio, dry })(args)
  }

  function update(args, { dry, json } = {}) {
    let stdio = 'inherit'
    if (json) {
      stdio = 'pipe'
    }

    return nSpawnCommand('update', { stdio, dry })(args)
  }

  function search(args, { dry, json } = {}) {
    let stdio = 'inherit'
    if (json) {
      stdio = 'pipe'
    }

    return nSpawnCommand('search', { stdio, dry })(args)
  }

  return {
    install,
    uninstall,
    update,
    search,
    start,
    where,
    checkPath,
    cmd,
    isRoot,
    sudo,
    name,
    v,
    distros,
    get,
    getPM,
    getPackageManager: getPM,
    tags,
    replacePMByDistro,
    getShell,
    pathWinToLinux,
  }
}

module.exports = nexssOS
