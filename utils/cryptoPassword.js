const crypto = require('crypto');

const cryptoPass = (password) => {
  const result = crypto.createHash('md5').update(password).digest('hex');
  return result;
}

module.exports = cryptoPass;