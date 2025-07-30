"use strict"

// dependencies
const express = require('./index');

//controllers
const clientRetriveController = require('../controllers/clients/retrive.controller.');
const clientPersisteController = require('../controllers/clients/persist.controller');

express.router.post('/clients', clientPersisteController.createClient);
express.router.get('/clients', clientRetriveController.getClients);
express.router.get('/clients/:clientId', clientRetriveController.getClientById);
express.router.put('/clients/:clientId', clientPersisteController.updateClient);
express.router.delete('/clients/:clientId', clientPersisteController.deleteClient);

module.exports = express.router;