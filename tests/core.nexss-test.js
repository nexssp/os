const os = require('../legacy')

// To write Linux tests
let currentOsSpecificTests = []
if (process.platform === 'win32') {
  currentOsSpecificTests.push({
    type: 'equal',
    params: [os.name(), 'Windows'],
  })
  currentOsSpecificTests.push({
    type: 'equal',
    params: [os.getPM(), 'scoop install'],
  })
}

const distros = os.distros

module.exports = {
  notEval: true, // params won't be evaluated before begin.
  nexsstests: [
    ...currentOsSpecificTests,
    {
      type: 'equal',
      params: [JSON.stringify(os.get()), /{"NAME":".*"/],
    },
    {
      params: ['node program.js', /^distrosList/, { chdir: __dirname }],
    },
  ],
}
