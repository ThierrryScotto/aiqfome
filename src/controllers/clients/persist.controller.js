"use strict"

// Database
const userDB = require("../../services/db/_clients");

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

    const newClient = await userDB.createClient({...clientBody, password: hashedPassword});

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

const updateClient = async (req, res) => {
  const { clientId } = req.params;
  const validatorResult = _validateBody(req.body);

  if (validatorResult.errors.length > 0) {
    return res.status(400).send({ message: `Invalid request body, error = ${validatorResult.errors}` });
  }

  try {
    const existingClient = await userDB.getClientById(clientId);

    if (!existingClient) {
      return res.status(404).send({ message: `Client id = ${clientId} not found` });
    }

    const { password, ...clientBody } = validatorResult.instance;
    const hashedPassword = await encrypt.hashPassword(password);

    const updatedClient = await userDB.updateClient(clientId, { ...clientBody, password: hashedPassword });

    const { password: _, ...client } = updatedClient;

    return res.status(200).send(client);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error occurred' });
  }
};

const deleteClient = async (req, res) => {
  const { clientId } = req.params;

  try {
    const existingClient = await userDB.getClientById(clientId);

    if (!existingClient) {
      return res.status(404).send({ message: `Client id = ${clientId} not found` });
    }

    await userDB.deleteClient(clientId);

    return res.status(204).send();
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: 'Internal server error occurred' });
  }
};

module.exports = {
  createClient,
  updateClient,
  deleteClient
}