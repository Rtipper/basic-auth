'use strict';

const express = require('express');
const User = require('../models/user.js');
const encrypt = require('../middleware/auth_mw/encrypt.js');
const pwVerification = require('../middleware/auth_mw/pwVerification.js');

const router = express.Router();


router.post('/signup', encrypt, signupRoute)

router.post('/signin', pwVerification, signinRoute)

function signupRoute(req, res) {
  res.status(201).json({
    status: 200,
    user: req.savedUser
  })
}

function signinRoute(req, res) {
  res.status(200).json({
    status: 200,
    login: `Login Successful! Welcome, User.`,
    user: req.userInfo
  })
}


module.exports = router;