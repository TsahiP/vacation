// filepath: d:\Tp\travel-sky\exam\vecation\server\middleware\auth.js
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Middleware to check if user is a validator
const isValidator = (req, res, next) => {
  if (req.user && req.user.role === 'Validator') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied: Validator role required' });
  }
};

module.exports = { authMiddleware, isValidator };