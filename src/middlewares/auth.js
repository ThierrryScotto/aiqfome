'use strict';

const { verifyToken } = require('../services/jwt/index');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({ error: 'Access token is needed' });
  }

  const token = authHeader.split(' ')[1];

  const decoded = verifyToken(token);

  if (!decoded) {
    return res.status(401).send({ error: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
};
