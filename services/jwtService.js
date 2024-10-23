// services/jwtService.js
const jwt = require('jsonwebtoken');

const jwtService = {
  generateToken: (user) => jwt.sign({
    id: user._id, 
    role: user.role   // Include role in the token
}, process.env.JWT_SECRET, {
    expiresIn: "1d"
}),
  verifyToken: (token) => {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return null;
    }
  },
};

module.exports = jwtService;
