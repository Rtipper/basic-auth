'use strict';

const base64 = require('base-64');
const bcrypt = require('bcrypt');

let details = 'username:p@ssw3rd';

let encoded = base64.encode(details);
console.log('details', encoded);

let decoded = base64.decode(encoded);
console.log('og thing', decoded);


// PROCESS OF HASHING AND SAVING TO THE DATABASE
let pw = 'mycoolpassword';
let salt = 10;

async function encrypt(password, complexity) {
  let hashed = await bcrypt.hash(password, complexity);

  console.log('encrypted:', hashed);

  let checkPW = await bcrypt.compare(password, hashed);
  console.log('is the passwprd the same?', checkPW);
}

encrypt(pw, salt);