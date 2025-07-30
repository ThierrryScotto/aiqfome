"use strict"

// dependencies
const express = require('./index');

//controllers
const authPersisteController = require('../controllers/auth/persist.controller');

express.router.post('/auth', authPersisteController.authClient);

module.exports = express.router;