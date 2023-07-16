const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Nutritionist= require('../models/nutritionistRegistration');
const nutritionrAuthMiddleware = require('../middleware/nutritionistAuthMiddleware')

process.env.JWT_SECRET = 'my-secret-key';

// ...

// ...

router.post('/nutrtionistlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if email exists in the database
    const nutritionist = await Nutritionist.findOne({ email });
    if (!nutritionist) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, nutritionist.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: nutritionist._id }, process.env.JWT_SECRET);

    res.json({
      token,
      nutritionist: {
        id: nutritionist._id,
        name: nutritionist.name,
        email: nutritionist.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// ...


// ...


// User registration endpoint
router.post('/nutritionistRegister', async (req, res) => {

  console.log("register Route hit")
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
    const nutritionist = await Nutritionist.findOne({ email });
    if (nutritionist) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newNutritionist = new Nutritionist({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newNutritionist.save();

    // Create and sign JWT token
    const token = jwt.sign({ id: newNutritionist._id }, process.env.JWT_SECRET);

    res.json({
      token,
      nutritionist: {
        id: newNutritionist._id,
        name: newNutritionist.name,
        email: newNutritionist.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/nutritionist', nutritionrAuthMiddleware, async (req, res) => {
  // Only accessible by admin users
  try {
    const nutritionist = await Nutritionist.find();
    res.json(nutritionist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.delete('/deleteNutritionist/:id',nutritionrAuthMiddleware, async (req, res) => {
  try {
    const nutritionist = await Nutritionist.findByIdAndDelete(req.params.id);
    if (!nutritionist) {
      return res.status(404).send({ msg: 'User not found' });
    }
    res.status(200).send({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;