// controllers/userController.js
const User = require('../models/User');
const bcryptService = require('../services/bcryptService');
const jwtService = require('../services/jwtService');
const emailService = require('../services/emailService');

const userController = {
  register: async (req, res) => {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).send({ message: 'Email already in use' });
    }

    const hashedPassword = await bcryptService.hashPassword(password);
    const user = new User({ name, email, password: hashedPassword, role: 'user' });
    await user.save();

    const token = jwtService.generateToken({ id: user._id, role: user.role });
    await emailService.sendVerificationEmail(user, token);

    res.status(201).send({ message: 'User created', userId: user._id, token });
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const validPassword = await bcryptService.comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    const token = jwtService.generateToken({ id: user._id, role: user.role });
    res.status(200).send({ token });
  },

  verifyEmail: async (req, res) => {
    // Verification token should be part of request body or query params
    const { token } = req.body;

    const payload = jwtService.verifyToken(token);
    if (!payload) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send({ message: 'Email verified' });
  },

  forgotPassword: async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    const token = jwtService.generateToken(user);
    await emailService.sendResetPasswordEmail(user, token);

    res.status(200).send({ message: 'Reset password email sent' });
  },

  resetPassword: async (req, res) => {
    const { token, newPassword } = req.body;

    const payload = jwtService.verifyToken(token);
    if (!payload) {
      return res.status(401).send({ message: 'Invalid or expired token' });
    }

    const user = await User.findById(payload.userId);
    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    user.password = await bcryptService.hashPassword(newPassword);
    await user.save();

    res.status(200).send({ message: 'Password reset successful' });
  },
};

module.exports = userController;
