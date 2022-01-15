const os = require('../../')
const os1 = new os()
const assert = require('assert')
// Just checking if functions works

// Check path works also on WSL when wsl is passed
// console.log(os1.checkPath('wsl bash')) // commented in case wsl is not installed

assert.deepStrictEqual(os1.getTags('Ubuntu', '20.10'), ['UBUNTU', 'UBUNTU20', 'UBUNTU2010'])
assert.deepStrictEqual(os1.getTags('Ubuntu', 20.1), ['UBUNTU', 'UBUNTU20', 'UBUNTU201'])
assert.deepStrictEqual(os1.getTags('Ubuntu', '20.10').first(), 'UBUNTU')
assert.deepStrictEqual(os1.getTags('Ubuntu', 20.1).second(), 'UBUNTU20')
assert.deepStrictEqual(os1.getTags('Ubuntu', 20.1).third(), 'UBUNTU201')
