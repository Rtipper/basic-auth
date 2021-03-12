'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const base64 = require('base-64');
const cors = require('cors');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;

const app = express();

// ALLOWS API USAGE
app.use(cors());

// ABILITY FOR FORM DATA TO BE PROCESSED ON THE FRONT END
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// MONGOOSE SCHEMA FOR DATABASE -- USUALLY IN ANOTHER FILE
const usersSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
})

// ASSIGN USER MODEL SO USERS CAN BE ADDED TO THE DATABASE | ALSO CREATES "USERS" COLLECTION IN DATABSAE (LIKE A TABLE)
const Users = mongoose.model('users', usersSchema);

// SIGNUP ROUTE
app.post('/signup', async (req, res) => {
  try {
    req.body.password = await bcrypt.hash(req.body.password, 5);
    const user = new Users(req.body);
    console.log('after instantiation of model:', user);
    const record = await user.save(req.body);
    console.log('after saving the record in the DB', record);
    res.status(200).json(record);
  } catch {
    res.status(200).json('error creating user');
  }
});

// SIGN IN ROUTE
app.post('/signin', async (res, req) => {
  let basicAuthParts = req.headers.authorization.split(' ')
  let encoder = basicAuthParts.pop();
  let decoded = base64.decode(encodedUser);
  let [username, password] = decoded.split(':')

  try {
    const user = await Users.findOne({ username: username })
    console.log('user after saved', user);
    const valid = await bcrypt.compare(password, user.password);

    if (valid) {
      res.status(200).json({ loggedIn: true });
    }
  } catch {
      console.error('user could not be retrieved');
  }
});

console.log(base64.encode('user1:coolpw'));

mongoose.connect('mongodb://localhost:3000/database-name', { userNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  app.listen(PORT, () => {
    console.log('now running on:', PORT);
  });
})
.catch(e => console.error('db error', e.message));