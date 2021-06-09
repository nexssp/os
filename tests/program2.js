const osLegacy = require('../legacy')

console.log(osLegacy.getTags('Ubuntu', '20.10')) // [ 'UBUNTU', 'UBUNTU20', 'UBUNTU2010' ]
console.log(osLegacy.getTags('Ubuntu', 20.1)) // [ 'UBUNTU', 'UBUNTU20', 'UBUNTU201' ]
console.log(osLegacy.getTags()) // [ 'WINDOWS', 'WINDOWS10', 'WINDOWS100' ] current OS tags

console.log(osLegacy.getTags('Ubuntu', '20.10').first()) // UBUNTU
console.log(osLegacy.getTags('Ubuntu', 20.1).second()) // UBUNTU20
console.log(osLegacy.getTags().third()) // WINDOWS100

// const php = nexssOS1.where('php')

// const wslFirst = nexssOS1.where('php wsl bash') // returns first found
// const wslAll = nexssOS1.where('php wsl bash', true) // returns all found

// const checkPathWSL = nexssOS1.checkPath('wsl bash')
// const checkPath = nexssOS1.checkPath('bash')
// console.log('!!!', checkPathWSL)

// console.log('###', nexssOS1.get())
const nexssOS = require('../')
const nexssOS1 = nexssOS()
const checkPathWSL = nexssOS1.checkPath('wsl')
console.log(checkPathWSL)
