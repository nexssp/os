var os = require('os')

console.log(os.type()) // "Windows_NT"
console.log(os.release()) // "10.0.14393"
console.log(os.platform()) // "win32"

const { execSync } = require('child_process')

const releaseData = execSync('sw_vers').toString().trim()

console.log('result macos: ', releaseData)

const splitted = releaseData.split(/\r?\n/)
const parsed = splitted
  .map((e) => {
    var s = e.split(':')
    return { key: [s[0]], value: s[1].trim && s[1].trim() }
  })
  .reduce(
    (acc, e) => ({
      ...acc,
      [e.key]: e.value && e.value.replace(/(^")|("$)/g, ''),
    }),
    {}
  )

console.log('parsed!!!!', parsed)
