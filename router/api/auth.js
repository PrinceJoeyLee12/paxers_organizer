const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const router = express.Router();
const normalizeUrl = require('normalize-url');
const passport = require('passport');

const {
  headerCheckTokenMiddleware,
  checkTokenMiddleware,
} = require('../../middleware/auth');
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
        { expiresIn: process.env.TOKEN_FOR_AUTH_EXPIRATION },
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

// @route      POST api/auth/forgot-password
// @desc       Forgot password sending link to email
// @access     public
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(400)
        .json({
          msg: '',
          errors: { email: 'Email not found on our database!' },
        });

    try {
      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.SECRET_KEY,
        { expiresIn: '10m' },
        (err, token) => {
          if (err) {
            return res
              .status(401)
              .json({
                msg: 'Cannot generate Token as of the moment ',
                errors: {},
              });
          } else {
            var transporter = nodemailer.createTransport({
              service: 'gmail',
              type: 'SMTP',
              host: 'smtp.gmail.com',
              secure: true,
              auth: {
                user: process.env.GOOGLE_EMAIL,
                pass: process.env.GOOGLE_EMAIL_PASS,
              },
            });

            const emailData = {
              from: process.env.GOOGLE_EMAIL,
              to: email,
              subject: `Password Reset link`,
              html: `
                      <h1>Please use the following link to reset your password</h1>
                      <p>${process.env.CLIENT_URL}/reset-password/${token}</p>
                      <hr />
                      <p>This email may contain sensitive information</p>
                      <p>${process.env.CLIENT_URL}</p>
                  `,
            };
            transporter.sendMail(emailData, function (error, info) {
              if (error) {
                res.status(500).json({
                  msg: `Cannot send link to ${email}. There's a failure in our side.`,
                  errors: {},
                });
              } else {
                res.json({
                  msg: `Link was successfully sent to ${email}. Please Check your Inbox`,
                  errors: {},
                });
              }
            });
          }
        },
      );
    } catch (err) {
      res.status(500).json({ msg: 'Server Error!', errors: {} });
    }
  } catch (err) {
    res.status(500).json({ msg: 'Server Error!', errors: {} });
  }
});

// @route      POST api/auth/reset-password
// @desc       Reset password in database
// @access     public
router.post('/reset-password', checkTokenMiddleware, async (req, res) => {
  const { password } = req.body;

  const user = await User.findById(req.user.id).select('password');

  try {
    if (!user)
      return res.status(400).json({
        msg: "We're Sorry User doesn't exist!",
      });
    // Change Password Here and update database

    // Hash password before saving in database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    const updatePassword = {
      password: user.password,
    };
    const filter = {
      _id: user._id,
    };

    await User.findOneAndUpdate(
      filter,
      updatePassword,
      {
        new: true,
      },
      (err, result) => {
        if (err) {
          return res
            .status(400)
            .json({ msg: "There's something wrong in saving new password" });
        }
        res.json({
          msg: "You've successfully changed your password try to login",
        });
      },
    );
  } catch (err) {
    return res.status(500).json({
      msg:
        "We're sorry something went wrong on our side. Please try again later",
    });
  }
});

module.exports = router;
