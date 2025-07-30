"use strict"

// dependencies
const express = require('./index');

//controllers
const FavoriteProductRetriveController = require('../controllers/favorite_products/retrive.controller.');
const FavoriteProductPersisteController = require('../controllers/favorite_products/persist.controller');

express.router.post('/clients/:clientId/favorite_products', FavoriteProductPersisteController.createFavoriteProduct);
express.router.get('/clients/:clientId/favorite_products', FavoriteProductRetriveController.getFavoriteProductByClientId);

module.exports = express.router;