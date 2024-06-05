const jwt = require('jsonwebtoken');
const User = require('../models/userModel'); // Adjust the path as necessary

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, user) => {
    if (err) return res.sendStatus(403);
    try {
      req.user = await User.findById(user.id);
      if (!req.user) return res.sendStatus(404);
      next();
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
};

module.exports = authenticateToken;
