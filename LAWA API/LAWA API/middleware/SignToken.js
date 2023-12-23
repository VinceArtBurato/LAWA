
const jwt = require('jsonwebtoken');

const signUserToken = (userId, secretKey, expiresIn) => {
  return jwt.sign({ userId, role: 'user' }, secretKey, { expiresIn });
};

const signAdminToken = (adminId, secretKey, expiresIn) => {
  return jwt.sign({ adminId, role: 'admin' }, secretKey, { expiresIn });
};

module.exports = {
  signUserToken,
  signAdminToken,
};
