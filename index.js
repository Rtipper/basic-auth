'use strict';

require('dotenv').config();
const server = require('./lib/server.js');
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT || 3000;

const options = { useNewUrlParser: true, useUnifiedTopology: true};

mongoose.connect(MONGODB_URI, options)
.then(() => {
  app.listen(PORT, () => {
    console.log('now running on:', PORT);
  });
})
.catch(e => console.error('db error', e.message));
