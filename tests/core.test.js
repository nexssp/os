let path = require('path');
const os = require('../src/index');

describe('Base functions', () => {
  test('os.name()', (done) => {
    const osName = os.name();
    if (process.platform !== 'win32') {
      expect(osName).toEqual(expect.any(String));
      expect(osName).not.toEqual('Windows');
    } else {
      expect(osName).toEqual('Windows');
    }
    done();
  });
});
