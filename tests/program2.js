const nexssOS = require('../lib/os')

const nexssOS1 = nexssOS()

// const php = nexssOS1.where('php')

// const wslFirst = nexssOS1.where('php wsl bash') // returns first found
// const wslAll = nexssOS1.where('php wsl bash', true) // returns all found

// const checkPathWSL = nexssOS1.checkPath('wsl bash')
// const checkPath = nexssOS1.checkPath('bash')
// console.log('!!!', checkPathWSL)

console.log('###', nexssOS1.get())
