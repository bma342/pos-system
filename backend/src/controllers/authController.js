const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, phone } = req.body;

    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = await User.create({
      username,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
    });

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Verify phone number
exports.verifyPhone = async (req, res) => {
  // Implement the logic to verify the phone number
  res.status(200).send('Phone number verified successfully');
};

// Request login code
exports.requestLoginCode = async (req, res) => {
  // Implement the logic to request a login code
  res.status(200).send('Login code sent');
};

// Login with code
exports.loginWithCode = async (req, res) => {
  // Implement the logic to login with a code
  const { phone, code } = req.body;
  // Example validation logic
  if (code === '123456') {
    res.status(200).send('Logged in successfully');
  } else {
    res.status(400).send('Invalid code');
  }
};
