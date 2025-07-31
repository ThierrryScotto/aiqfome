"use strict"

// dependencies
const express = require('./index');
const authMiddleware = require('../middlewares/auth');

//controllers
const productRetriveController = require('../controllers/products/retrive.controller.');

express.router.get('/products', authMiddleware, productRetriveController.getProducts);

module.exports = express.router;