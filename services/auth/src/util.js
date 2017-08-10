const jwt = require('jsonwebtoken');
const config = require('./config');

class Util {
  static jwtPromisify(token) {
    return new Promise((res, rej) => {
      return jwt.verify(token, config.secretKey, (err, decoded) => {
        return err ? rej(err) : res(decoded);
      });
    })
  }
}

module.exports = Util;
