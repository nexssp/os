module.exports = () => {
  const envShow = [
    'NEXSS_SRC_PATH',
    'NEXSS_HOME_PATH',
    'NEXSS_APPS_PATH',
    'NEXSS_LANGUAGES_PATH',
    'NEXSS_PACKAGES_PATH',
    'NEXSS_CACHE_PATH',
    'NEXSS_BACKUP_PATH',
    'NEXSS_PROJECT_PATH',
  ]

  const { bold, blueBG, yellow } = require('@nexssp/ansi')
  const os = require('../../../legacy')
  const distr = os.name()

  // For Nexss Programmer
  if (process.env.NEXSS_SRC_PATH) {
    console.log(yellow(bold(blueBG(process.title))))
    console.log(yellow(bold(blueBG('\nNexss Programmer Environment Variables'))))
    envShow.forEach((e) => console.log(`${bold(e)}=${process.env[e]}`))
  }

  console.log(yellow(bold(blueBG('OS Information'))))
  if (process.platform != 'win32') {
    if (process.platform != 'freebsd') {
      try {
        const procVersion = require('child_process').execSync('cat /proc/version').toString().trim()
        console.log(gray(procVersion.replace('Linux version ', '')))
      } catch (e) {
        // console.log("You don't have access to the /proc/version.")
      }
    }
  } else {
    const version = require('child_process').execSync('ver').toString().trim()

    console.log('Windows version:\t', yellow(bold(version)))
  }
  if (process.platform != 'win32') {
    console.log('OS distribution:\t', yellow(bold(distr)))

    if (distr !== 'Arch Linux') console.log('OS version os.v():\t', yellow(bold(os.v())))
  }

  const nodeOS = require('os')

  console.log('Hostname:\t\t', yellow(bold(nodeOS.hostname())))
  console.log('Search command:\t\t', yellow(bold(os.replacePMByDistro('apt-get search'))))
  console.log('Install command:\t', yellow(bold(os.replacePMByDistro('apt-get install -y'))))
  console.log('Update command:\t\t', yellow(bold(os.replacePMByDistro('apt-get update -y'))))
  console.log('Uninstall command:\t', yellow(bold(os.replacePMByDistro('apt-get remove -y'))))
  if (process.platform !== 'win32') {
    console.log('Shell:\t\t\t', yellow(bold(os.getShell())))
  }
  console.log(
    'Tags:\t\t\t',
    `${yellow(bold(os.tags().join(', ')))} (to use in a distro recognition)`
  )
}
