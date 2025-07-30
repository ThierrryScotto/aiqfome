"use strict"

// Database
const clientDB = require("../../services/db/_clients");

// helpers
const validator = require('../../helpers/validate.helpers');
const encrypt = require('../../helpers/encrypt.helpers');

const _validateBody = (body) => {
  const clientSchema = {
    'id': '/CreateClient',
    'type': 'object',
    'properties': {
      'name': { 'type': 'string', 'minLength': 2 },
      'email': { 'type': 'string', 'format': 'email' },
      'password': { 'type': 'string', 'minLength': 6 }
    },
    'required': ['name', 'email', 'password']
  };
  return validator.validate(clientSchema, body);
};

const createClient = async (req, res) => {
  try {
    const validatorResult = _validateBody(req.body);

    if (validatorResult.errors.length > 0) {
      return res.status(400).send({ message: `Invalid request body, error = ${validatorResult.errors}`});
    }

    const { password, ...clientBody } = validatorResult.instance;

    const hashedPassword = await encrypt.hashPassword(password);

    const newClient = await clientDB.createClient({...clientBody, password: hashedPassword});

    const { password: _, ...addedClient } = newClient;

    return res.status(201).send(addedClient);
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).send({ message: 'Email already exists' });
    }

    console.error(err);
    return res.status(500).send({ message: 'Internal server error occurred' });
  }
};

const getClients = async (req, res) => {
  const clients = await clientDB.getClients();

  if (!clients) {
    return res.status(404).send({ message: "No Client found" });
  }

  return res.status(200).send(clients);
}

const getClientById = async (req, res) => {
  const { clientId } = req.params;

  const client = await clientDB.getClientById(clientId);

  if (!client) {
    return res.status(404).send({ message: `Client id = ${clientId} not found` });
  }

  return res.status(200).send(client);
}

module.exports = {
  createClient,
  getClientById,
  getClients
}