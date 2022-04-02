const { execSync } = require('child_process')

const r = execSync('system_profiler').toString().trim()

console.log('result macos: ', r)
