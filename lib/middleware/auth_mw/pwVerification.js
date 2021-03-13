'use strict';

const bcrypt = require('bcrypt');
const base64 = require('base-64');

const User = require('../../models/user.js');

module.exports = async function (req, res, next) {
  let basicAuthParts = req.headers.authorization.split(' ')
  let encoder = basicAuthParts.pop();
  let decoded = base64.decode(encodedUser);
  let [username, password] = decoded.split(':')

  try {
    const user = await User.findOne({ username: username })
    console.log('user after saved', user);
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      res.status(200).json({ loggedIn: true });
    }
  } catch {
      console.error('user could not be retrieved');
  }
}