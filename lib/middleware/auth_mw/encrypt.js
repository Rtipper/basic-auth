'use strict';

const express = require('express');
const cors = require('cors');

const bcrypt = require('bcrypt');
const User = require('../../models/user.js');
const base64 = require('base-64');

const mongoose = require('mongoose');

module.exports = async function encryptedUser(req, res, next) {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 10);
    const user = new User(req.body);
    console.log('after instatiation of model:', user);
    
    const record = await user.save(req.body);
    console.log('after saving the record in the datatbase', record);
    res.status(200).json(record);
    next();
  } catch {
    res.status(500).send('there was an error in creating this user');
  }
}