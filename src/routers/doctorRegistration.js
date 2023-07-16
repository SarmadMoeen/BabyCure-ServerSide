const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Doctor = require('../models/doctorRegistration');
const doctorAuthMiddleware = require('../middleware/doctorAuthMiddleware')

process.env.JWT_SECRET = 'my-secret-key';

// ...

// ...

router.post('/doctorlogin', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ msg: 'Please provide email and password' });
    }

    // Check if email exists in the database
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid email or password' });
    }

    // Create and sign JWT token
    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);

    res.json({
      token,
      doctor: {
        id: doctor._id,
        name: doctor.name,
        email: doctor.email,
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
router.post('/doctorRegister', async (req, res) => {
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
    const doctor = await Doctor.findOne({ email });
    if (doctor) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newDoctor.save();

    // Create and sign JWT token
    const token = jwt.sign({ id: newDoctor._id }, process.env.JWT_SECRET);

    res.json({
      token,
      doctor: {
        id: newDoctor._id,
        name: newDoctor.name,
        email: newDoctor.email,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.get('/doctorUsers', async (req, res) => {
  // Only accessible by admin users
  try {
    const { filter } = req.query;
    let query = {};

    if (filter) {
      query = { name: filter };
    }

    const users = await Doctor.find(query);
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


router.delete('/deleteUsers/:id',doctorAuthMiddleware, async (req, res) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).send({ msg: 'User not found' });
    }
    res.status(200).send({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send({ msg: 'Server error' });
  }
});

module.exports = router;