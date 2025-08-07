const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Ensure path is correct
const authMiddleware = require('../middleware/auth');
const router = express.Router();


// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hash });
    await newUser.save();
    res.status(201).json({ message: "User registered" });
  } catch (err) {
    console.error("Registration Error:", err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.get('/me', authMiddleware, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: 'User authenticated successfully.',
      user: req.user // Contains email
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({ message: 'Server error while retrieving user info.' });
  }
});



module.exports = router;
