let path = require('path');
const { pathWinToLinux } = require('../src/index');

const testValuesNotToBe = {
  'C:\\Users\\mapoart': 'C:\\Users\\mapoart',
  'C:\\Users\\mapoart': null,
  'CC:\\Users\\mapoart': '/mnt/cc/Users/mapoart',
};

const testValuesToBe = {
  'C:\\Users\\mapoart': '/mnt/c/Users/mapoart',
  'd:\\Users\\mapoart': '/mnt/d/Users/mapoart',
  'w:\\Users\\mapoart': '/mnt/w/Users/mapoart',
  'Users\\mapoart': './Users/mapoart',
  '\\Users\\mapoart': '/Users/mapoart',
};

describe('winVsLinux', () => {
  test(`os.pathWinToLinux() => `, (done) => {
    for (const [k, v] of Object.entries(testValuesNotToBe)) {
      expect(pathWinToLinux(k)).not.toBe(v);
    }

    for (const [k, v] of Object.entries(testValuesToBe)) {
      expect(pathWinToLinux(k)).toBe(v);
    }
    done();
  });
});
