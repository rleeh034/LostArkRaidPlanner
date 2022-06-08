const crypto = require('crypto');

function createId() {
  return crypto.randomBytes(5).toString('hex')
}


module.exports = { createId };