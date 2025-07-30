"use strict"

// dependencies
const express = require('./index');
const authMiddleware = require('../middlewares/auth');

//controllers
const clientRetriveController = require('../controllers/clients/retrive.controller.');
const clientPersisteController = require('../controllers/clients/persist.controller');

express.router.post('/clients', clientPersisteController.createClient);
express.router.get('/clients', authMiddleware, clientRetriveController.getClients);
express.router.get('/clients/:clientId', authMiddleware, clientRetriveController.getClientById);
express.router.put('/clients/:clientId', authMiddleware, clientPersisteController.updateClient);
express.router.delete('/clients/:clientId', authMiddleware, clientPersisteController.deleteClient);

module.exports = express.router;