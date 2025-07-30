"use strict"

// Database
const userDB = require("../../services/db/_clients");

const getClients = async (req, res) => {
  const clients = await userDB.getClients();

  if (!clients) {
    return res.status(404).send({ message: "No Client found" });
  }

  return res.status(200).send(clients);
}

const getClientById = async (req, res) => {
  const { clientId } = req.params;

  const client = await userDB.getClientById(clientId);

  if (!client) {
    return res.status(404).send({ message: `Client id = ${clientId} not found` });
  }

  return res.status(200).send(client);
}

module.exports = {
  getClientById,
  getClients
}