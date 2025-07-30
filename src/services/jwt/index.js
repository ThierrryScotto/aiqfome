'use strict';

require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWTSECRET;
const EXPIRES_IN = '30m';

const generateToken = (id) => {
  return jwt.sign({ id }, JWT_SECRET, { expiresIn: EXPIRES_IN });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET); // retorna { id, iat, exp }
  } catch {
    return null;
  }
};

module.exports = {
  generateToken,
  verifyToken
}