'use strict';

const express = require('express');
const User = require('../models/users.js');
const encrypt = require('../../middleware/auth/encrypt.js');
const verify = require('../../middleware/auth/pwVerification.js');

const router = express.Router();


router.post('/signup', encrypt, (req, res) => {
  res.status(200).json();
});


router.post('/signin', verify, (req, res) => {
  res.status(200).json();
});

module.exports = router;