// token.js

const jwt = require('jsonwebtoken');
const { USER_JWT_SECRET, ADMIN_JWT_SECRET, USER_TOKEN_EXPIRATION, ADMIN_TOKEN_EXPIRATION } = process.env;

const generateAccessToken = (userId, role) => {
  const secretKey = role === 'admin' ? ADMIN_JWT_SECRET : USER_JWT_SECRET;
  const tokenExpiration = role === 'admin' ? ADMIN_TOKEN_EXPIRATION : USER_TOKEN_EXPIRATION;

  return jwt.sign({ userId, role }, secretKey, { expiresIn: tokenExpiration });
};

const verifyRefreshToken = (refreshToken, role) => {
  const secretKey = role === 'admin' ? ADMIN_JWT_SECRET : USER_JWT_SECRET;

  return jwt.verify(refreshToken, secretKey);
};

module.exports = { generateAccessToken, verifyRefreshToken };
