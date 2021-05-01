const express = require('express');
const router = express.Router();
const { Concern } = require('../../models/Concern');

// @route      POST api/contact-us
// @desc       SEnd Concern
// @access     public
router.post('/', async (req, res) => {
  const { email, firstName, lastName, message } = req.body;

  try {
    const concern = new Concern({
      firstName,
      lastName,
      email,
      message,
    });

    await concern.save();

    res.json({
      msg:
        'Concern was successfully sent to one of our staff please wait for their reply. ',
      errors: {},
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      msg: 'Internal Server Error. Please Try Again Later',
      errors: {},
    });
  }
});

module.exports = router;
