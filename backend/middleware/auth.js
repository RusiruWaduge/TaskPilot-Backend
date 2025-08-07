const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Adjust path as needed

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Include 'name' in the selected fields
    const user = await User.findById(decoded.id).select('name email avatarUrl');

    if (!user) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.user = user; // Attach full user object
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = authMiddleware;
