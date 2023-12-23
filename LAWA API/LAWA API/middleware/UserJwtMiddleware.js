// authenticateToken.js

const jwt = require('jsonwebtoken');
const { USER_JWT_SECRET, USER_TOKEN_EXPIRATION } = process.env; // Import environment variables
const { generateAccessToken, verifyRefreshToken } = require('./token');

const authenticateToken = async (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    const decoded = jwt.verify(tokenParts[1], USER_JWT_SECRET);

    // Log the decoded token
    console.log('Decoded Token:', decoded);

    if (!decoded || !decoded.userId) {
      return res.status(401).json({ message: 'Invalid token content.' });
    }

    // Check if the token is about to expire, and refresh if needed
    const expirationTime = decoded.exp * 1000; // in milliseconds
    const currentTime = Date.now();

    if (expirationTime - currentTime < 300000) {
      // If the token is about to expire in the next 5 minutes, refresh it
      const newToken = await generateAccessToken(decoded.userId, 'user');
      res.setHeader('Authorization', `Bearer ${newToken}`);
    }

    req.user = {
      userId: decoded.userId,
    };

    next();
  } catch (error) {
    console.error('Error verifying user token:', error);
    res.status(403).json({ message: 'Invalid user token.' });
  }
};

module.exports = authenticateToken;
