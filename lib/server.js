'use strict';

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const routes = require('../lib/routes/auth.js');
const notFoundHandler = require('./middleware/errors_mw/404.js')
const errorHandler = require('./middleware/errors_mw/500.js')
const authRoutes = require('./routes/auth.js')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(authRoutes);
app.use('*', notFoundHandler)
app.use(errorHandler)

app.use('/', routes);

module.exports = {
  app: app,
  start: port => {
    app.listen(port, () => {
      console.log(`Now listening on: ${port}`);
    });
  }
}