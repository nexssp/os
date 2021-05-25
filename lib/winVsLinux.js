module.exports.pathWinToLinux = (p) => {
  if (win32IsAbsolute(p)) {
    let r = p.replace(/([a-zA-Z])\:/, '/mnt/$1').replace(/\\/g, '/')
    r = r.split('')
    r[5] = r[5].toLowerCase()
    r = r.join('')
    return r
  } else {
    return `./${p.replace(/\\/g, '/')}`
  }
}
// This part is based on the great NodeJS sources!
function win32IsAbsolute(path) {
  var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/
  var result = splitDeviceRe.exec(path),
    device = result[1] || '',
    isUnc = !!device && device.charAt(1) !== ':'
  // UNC paths are always absolute
  return !!result[2] || isUnc
}
