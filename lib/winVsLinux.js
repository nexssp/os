module.exports.pathWinToLinux = (p) => {
  var { isAbsolute } = require('path');
  if (isAbsolute(p)) {
    let r = p.replace(/([a-zA-Z])\:/, '/mnt/$1').replace(/\\/g, '/');
    r = r.split('');
    r[5] = r[5].toLowerCase();
    r = r.join('');
    return r;
  } else {
    return `./${p.replace(/\\/g, '/')}`;
  }
};
