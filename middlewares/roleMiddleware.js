
module.exports = {
    ensureAdmin: (req, res, next) => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ error: 'This action requires admin privileges' });
      }
    },
  
    ensureUser: (req, res, next) => {
      if (req.user && req.user.role === 'user') {
        next();
      } else {
        res.status(403).json({ error: 'This action requires user privileges' });
      }
    },
  };
  