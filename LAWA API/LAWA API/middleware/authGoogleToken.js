const jwt = require('jsonwebtoken');
const axios = require('axios');

const authenticateGoogleToken = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    const tokenParts = token.split(' ');

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(401).json({ message: 'Invalid token format.' });
    }

    // Extract header from the JWT
    const header = jwt.decode(tokenParts[1], { complete: true })?.header;

    if (!header || !header.alg) {
      console.error('Error extracting algorithm from JWT header:', header);
      return res.status(401).json({ message: 'Invalid algorithm in JWT.' });
    }

    console.log('Received Google Token:', tokenParts[1]);
console.log('Decoded Header:', header);


    let algorithm, secret;

    if (header.alg === 'HS256') {
      algorithm = 'HS256';
      secret = process.env.CLIENT_SECRET;
    } else if (header.alg === 'RS256') {
      algorithm = 'RS256';
      // Fetch Google's JSON Web Key (JWK) Set for token verification
      const jwksUri = 'https://www.googleapis.com/oauth2/v3/certs';
      const { data: jwks } = await axios.get(jwksUri);
      
      // Find the key in JWKS that matches the key ID (kid) from the JWT header
      const key = jwks.keys.find((k) => k.kid === header.kid);

      if (!key) {
        return res.status(401).json({ message: 'Invalid key ID in JWT.' });
      }

      secret = key;
    } else {
      console.error('Unsupported algorithm in JWT:', header.alg);
      return res.status(401).json({ message: 'Unsupported algorithm in JWT.' });
    }

    jwt.verify(tokenParts[1], secret, { algorithms: [algorithm] }, (err, decoded) => {
      if (err) {
        console.error('Error verifying Google token:', err);
        return res.status(403).json({ message: 'Invalid Google token.' });
      }

      req.user = {
        googleUserId: decoded.sub,
        // Include other user properties as needed
      };

      next();
    });

  } catch (error) {
    console.error('Error verifying Google token:', error);
    res.status(403).json({ message: 'Invalid Google token.' });
  }
};

module.exports = authenticateGoogleToken;
