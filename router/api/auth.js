const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { headerCheckTokenMiddleware } = require('../../middleware/auth');
const { User } = require('../../models/User');

// @route    GET api/auth
// @desc     Get user by token
// @access   Public
router.get('/', headerCheckTokenMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Error authenticating user. Please try again later' });
  }
});

// @route    POST api/auth/login
// @desc     Login User
// @access   Public
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ msg: '', errors: { email: 'Email not found!' } });
    } else {
      if (user.password.includes('password-')) {
        return res.status(400).json({
          msg:
            "You've logged in using google \n lately try to login with your google account",
          errors: {},
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log('not match');
        return res
          .status(400)
          .json({ msg: '', errors: { password: 'Password is incorrect!' } });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: process.env.TOKEN_EXPIRATION },
        (err, token) => {
          if (err)
            return res.status(401).json({
              msg: 'Cannot generate Token as of the moment ',
              errors: {},
            });
          res.json({ token });
        },
      );
    }
  } catch (err) {
    res
      .status(500)
      .json({ msg: 'Server Error. Please try again later', errors: {} });
  }
});

module.exports = router;
