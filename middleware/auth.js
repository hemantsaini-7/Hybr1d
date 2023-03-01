// Creating an Auth Middleware which is required for protected routes to access UserID and UserType from Token

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Accessing Authorization Header
  const authHeader = req.headers.authorization;

  // Splitting toker from header (Bearer Token)
  const token = authHeader && authHeader.split(' ')[1];

  // If Token won't exist in header
  if (!token) {
    return res.status(401).json({ message: 'Missing JWT token' });
  }

  try {
    // Decoding the Token and setting req.user as payload coming i.e userID and userType
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken.user;
    // Passing the flow to next MW
    next();
  } catch (err) {
    // Catching errors incase of invalid token
    console.error(err);
    res.status(401).json({ message: 'Invalid JWT token' });
  }
}

// Exporting Auth Middleware
module.exports = authMiddleware;
