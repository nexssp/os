exports.cmd = (command, { all, dry }) => {
  if (!dry) {
    const shell = require('../legacy').getShell()
    return (what) => {
      try {
        const result = require('child_process')
          .execSync(`${command} ${what}`, {
            shell,
          })
          .toString()
          .trim()

        // we return all found
        if (all) {
          return result
        }

        return result.split(/\r?\n/)[0]
      } catch (error) {
        // console.log(error)
        return false
      }
    }
  } else {
    return (what) => `${command} ${what}`
  }
}
