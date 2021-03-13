'use strict';

module.exports = (err, req, res, next) => {
  res.status(500).json({
    error: err || err.message,
    status: 500,
    message: 'Something went wrong, sorry!'
  })
}