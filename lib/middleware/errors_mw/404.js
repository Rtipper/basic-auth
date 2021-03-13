'use strict';

module.exports = (req, res, next) => {
  res.status(404).json({
    error: err || err.message,
    status: 404,
    message: 'You seem to have gotten lost..'
  })
}