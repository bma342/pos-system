const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
// const twilio = require('twilio');

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = new twilio(accountSid, authToken);

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { username, email, password, phone, roleId } = req.body;
    // const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      username,
      email,
      phone,
      password: hashedPassword,
      roleId,
      // verificationCode,
      verified: false,
    });

    // await client.messages.create({
    //   body: `Your verification code is ${verificationCode}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone,
    // });

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.verifyPhone = async (req, res) => {
  const { phone, verificationCode } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) return res.status(400).json({ message: 'User not found.' });

    if (user.verificationCode === verificationCode) {
      user.verified = true;
      user.verificationCode = null;
      await user.save();

      res.json({ message: 'Phone number verified successfully.' });
    } else {
      res.status(400).json({ message: 'Invalid verification code.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.requestLoginCode = async (req, res) => {
  const { phone } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user) return res.status(400).json({ message: 'User not found.' });

    const loginCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.verificationCode = loginCode;
    await user.save();

    // await client.messages.create({
    //   body: `Your login code is ${loginCode}`,
    //   from: process.env.TWILIO_PHONE_NUMBER,
    //   to: phone,
    // });

    res.json({ message: 'Login code sent.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};

exports.loginWithCode = async (req, res) => {
  const { phone, verificationCode } = req.body;

  try {
    const user = await User.findOne({ where: { phone } });

    if (!user || user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: 'Invalid code.' });
    }

    user.verificationCode = null;
    await user.save();

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
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
    if (!user) return res.status(400).json({ message: 'Invalid email or password.' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).json({ message: 'Invalid email or password.' });

    const token = jwt.sign({ id: user.id, roleId: user.roleId }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error.', error });
  }
};
