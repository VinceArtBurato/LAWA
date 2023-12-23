const jwt = require('jsonwebtoken');
const adminSecretKey = process.env.ADMIN_JWT_SECRET || 'default_admin_secret_key';

const adminAuthenticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    const decoded = jwt.verify(tokenParts[1], adminSecretKey);

// Log the decoded token
console.log('Decoded Token:', decoded);

if (!decoded || !decoded.adminId || decoded.role !== 'admin') {
  return res.status(401).json({ message: 'Invalid token content or unauthorized role.' });
}

    req.user = {
      userId: decoded.adminId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    console.error('Error verifying admin token:', error);
    res.status(403).json({ message: 'Invalid admin token.' });
  }
};

module.exports = adminAuthenticateToken;