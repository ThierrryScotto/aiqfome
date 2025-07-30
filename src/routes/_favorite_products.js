"use strict"

// dependencies
const express = require('./index');
const authMiddleware = require('../middlewares/auth');

//controllers
const FavoriteProductRetriveController = require('../controllers/favorite_products/retrive.controller.');
const FavoriteProductPersisteController = require('../controllers/favorite_products/persist.controller');

express.router.post('/clients/:clientId/favorite_products', authMiddleware, FavoriteProductPersisteController.createFavoriteProduct);
express.router.get('/clients/:clientId/favorite_products', authMiddleware, FavoriteProductRetriveController.getFavoriteProductByClientId);

module.exports = express.router;