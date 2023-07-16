const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/registration');
const authMiddleware = require('../middleware/authMiddleware');





// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if email exists in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// User registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input fields
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ msg: 'Please fill in all fields' });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ msg: 'Passwords do not match' });
    }

    // Check if email already exists in database
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    // Create and sign JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);

    res.json({
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get all users (requires authentication)
router.get('/users', async (req, res) => {
  try {
    const { filter } = req.query;
    let query = {};

    if (filter) {
      query = { name: filter };
    }

    const users = await User.find(query);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Delete a user by ID (requires authentication)
router.delete('/deleteUsers/:id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send({ msg: 'User not found' });
    }
    res.status(200).send({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Server error' });
  }
});


router.put('/updatePassword/:userId', authMiddleware, async (req, res) => {
  try {
    const { userId } = req.params;
    const { currentPassword, newPassword } = req.body;

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Compare the provided currentPassword with the hashed password stored in the database
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid current password' });
    }

    // Hash the new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});






module.exports = router;
