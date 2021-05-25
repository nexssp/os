let path = require('path')
const { pathWinToLinux } = require('../legacy')

const testValuesNotToBe = {
  'C:\\Users\\mapoart': 'C:\\Users\\mapoart',
  'C:\\Users\\mapoart': null,
  'CC:\\Users\\mapoart': '/mnt/cc/Users/mapoart',
}

const testValuesToBe = {
  'C:\\Users\\mapoart': '/mnt/c/Users/mapoart',
  'd:\\Users\\mapoart': '/mnt/d/Users/mapoart',
  'w:\\Users\\mapoart': '/mnt/w/Users/mapoart',
  'Users\\mapoart': './Users/mapoart',
  '\\Users\\mapoart': '/Users/mapoart',
}

let generatedTests = []
for (const [k, v] of Object.entries(testValuesNotToBe)) {
  generatedTests.push({
    type: 'notEqual',
    params: [pathWinToLinux(k), v],
  })
}

for (const [k, v] of Object.entries(testValuesToBe)) {
  console.log({
    type: 'equal',
    params: [pathWinToLinux(k), v],
  })
  generatedTests.push({
    type: 'equal',
    params: [pathWinToLinux(k), v],
  })
}

module.exports = {
  notEval: true, // params won't be evaluated before begin.
  nexsstests: [...generatedTests],
}
