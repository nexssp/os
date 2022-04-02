var os = require('os')

console.log(os.type()) // "Windows_NT"
console.log(os.release()) // "10.0.14393"
console.log(os.platform()) // "win32"

const { execSync } = require('child_process')

const r = execSync('sw_vers').toString().trim()

console.log('result macos: ', r)
