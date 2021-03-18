'use strict';

const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
const User = require('../../models/user.js');
const base64 = require('base-64');

const mongoose = require('mongoose');

module.exports = async function (req, res, next) {
  try {
    if (req.body.username && req.body.password) {
      req.body.password = await bcrypt.hash(req.body.password, 10);
      const user = new User(req.body);
      const saveUser = await user.save(req.body)
      req.savedUser = saveUser;
      next();
    } else {
      next('Username or Password is invalid. Please try again.')
    }

  } catch {
    console.error('Something went wrong.. Sorry!')
  }
}