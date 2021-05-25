module.exports = () => {
  const { bold, blueBG, yellow } = require('@nexssp/ansi')
  const os = require('../../../legacy')
  const distr = os.name()
  console.log(yellow(bold(blueBG(process.title))))
  // console.log(yellow(bold(blueBG('\nEnvironment Variables'))))
  // envShow.forEach((e) => console.log(`${bold(e)}=${process.env[e]}`))
  console.log(yellow(bold(blueBG('\nOS Information'))))
  if (process.platform != 'win32') {
    try {
      const procVersion = require('child_process').execSync('cat /proc/version').toString().trim()
      console.log(grey(procVersion.replace('Linux version ', '')))
    } catch (e) {
      // console.log("You don't have access to the /proc/version.")
    }
  } else {
    const version = require('child_process').execSync('ver').toString().trim()

    console.log('Windows version:\t', yellow(bold(version)))
  }
  if (process.platform != 'win32') {
    console.log('Linux distribution:\t', yellow(bold(distr)))

    if (distr !== 'Arch Linux') console.log('Linux version os.v():\t\t', yellow(bold(os.v())))
  }

  console.log('Search command:\t\t', yellow(bold(os.replacePMByDistro('apt-get search'))))
  console.log('Install command:\t', yellow(bold(os.replacePMByDistro('apt-get install -y'))))
  console.log('Update command:\t\t', yellow(bold(os.replacePMByDistro('apt-get update -y'))))
  console.log('Uninstall command:\t', yellow(bold(os.replacePMByDistro('apt-get remove -y'))))
  console.log('Tags:\t', `${yellow(bold(os.tags().join(', ')))} (to use in a distro recognition)`)
}
