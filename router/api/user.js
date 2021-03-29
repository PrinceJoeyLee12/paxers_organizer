const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../../models/User');

// @route: /api/organizer/register
// @description: Register new account for organizers
// @accessability: public
router.post('/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    let user = await User.findOne({ email });

    if (user)
      return res.status(400).json({
        msg: '',
        errors: { email: 'You already have an account. Please Login' },
      });

    user = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // Encrypt Password
    const salt = bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.SECRET_KEY,
      { expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION },
      (err, token) => {
        if (err)
          return res.status(500).json({
            msg: 'Cannot generate token as of the moment',
            errors: {},
          });
        res.json({ token });
      },
    );
  } catch (err) {}
  res.status(200).json({ msg: 'Login Success', errors: {} });
});

module.exports = router;
