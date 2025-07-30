"use strict"

// dependencies
const express = require('./index');

//controllers
const FavoriteProductRetriveController = require('../controllers/favorite_products/retrive.controller.');
const FavoriteProductPersisteController = require('../controllers/favorite_products/persist.controller');

express.router.post('/favorite_products', FavoriteProductPersisteController.createFavoriteProduct);
express.router.get('/favorite_products/:clientId', FavoriteProductRetriveController.getFavoriteProductByClientId);

module.exports = express.router;