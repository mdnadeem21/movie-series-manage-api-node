// services/emailService.js
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_ADDRESS,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const emailService = {
  sendVerificationEmail: async (user, token) => {
    const email = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: 'Email Verification',
      text: `Please verify your email by using the following token: ${token}`,
    };

    await transport.sendMail(email);
  },

  sendResetPasswordEmail: async (user, token) => {
    const email = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: 'Reset Password',
      text: `You can reset your password by using the following token: ${token}`,
    };

    await transport.sendMail(email);
  },
};

module.exports = emailService;
