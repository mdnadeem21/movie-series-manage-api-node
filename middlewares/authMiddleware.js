// middlewares/authMiddleware.js
const jwtService = require('../services/jwtService');
const User = require('../models/User');

module.exports = {
  authenticateToken: async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      return res.status(401).json({ error: 'Missing token' });
    }

    const payload = jwtService.verifyToken(token);
    if (!payload) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(403).json({ error: 'User not found' });
    }

    req.user = user; // add user to request object
    next();
  },
};
