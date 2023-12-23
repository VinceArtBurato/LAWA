const express = require('express');
const router = express.Router();
const { verifyRefreshToken, generateAccessToken } = require('../middleware/token');

// Endpoint for refreshing tokens
router.post('/refresh', async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ message: 'Refresh token is required.' });
  }

  try {
    // Verify the refresh token
    const decoded = await verifyRefreshToken(refreshToken);

    // Generate a new access token
    const newAccessToken = await generateAccessToken(decoded.userId, decoded.role);

    // Respond with the new access token
    res.json({ accessToken: newAccessToken });
  } catch (error) {
    console.error('Error refreshing token:', error);
    res.status(403).json({ message: 'Invalid refresh token.' });
  }
});

module.exports = router;
