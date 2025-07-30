'use strict'

// Database
const clientDB = require("../../services/db/_clients");

// JWT
const { generateToken } = require("../../services/jwt/index");

// helpers
const encrypt = require('../../helpers/encrypt.helpers');
const validator = require('../../helpers/validate.helpers');

const _validateBody = (body) => {
  const authchema = {
    'id': '/AuthClient',
    'type': 'object',
    'properties': {
      'email': { 'type': 'string', 'format': 'email' },
      'password': { 'type': 'string', 'minLength': 6 }
    },
    'required': ['email', 'password']
  };
  return validator.validate(authchema, body);
};

const authClient = async (req, res) => {

  const validatorResult = _validateBody(req.body);

  if (validatorResult.errors.length > 0) {
    return res.status(400).send({ message: `Invalid request body, error = ${validatorResult.errors}`});
  }

  const { email, password } = req.body;

  const client = await clientDB.getClientByEmail(email);

  if (!client) {
    return res.status(404).send('Client not found');
  }

  if (!await encrypt.comparePassword(password, client.password)) {
    return res.status(404).send({ error: 'Invalid password' });
  }

  const token = generateToken(client.id);
  
  let authenticatedClient = {
    id: client.id,
    name: client.name,
    email: client.email,
    created_at: client.created_at,
    updated_at: client.updated_at
  };

  res.send({ authenticatedClient, token });
}

module.exports = {
  authClient
}