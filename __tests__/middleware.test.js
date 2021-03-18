'use strict';

require('@code-fellows/supergoose');

const encrypt = require('../lib/middleware/auth_mw/encrypt.js')
const base64 = require('base-64')

const verifyPassword = require('../lib/middleware/auth_mw/pwVerification.js')

describe('ROUTE TESTS', () => {

  let res = {};
  let next = jest.fn();

  it('Will create a new User', async () => {
    let req = {
      body: {
        username: 'rtipper',
        password: '31620'
      }
    }
  
    await encrypt(req, res, next)
    expect(next).toHaveBeenCalled()
  })

  it('Will create a new User', async () => {
    let encoded = base64.encode('rtipper:31620')
    let req = {
      headers: {
        authorization: encoded
      }
    }
    await verifyPassword(req, res, next)
    expect(next).toHaveBeenCalled()
  })
})