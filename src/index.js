"use strict"

// dependecies
const router = require('./routes/index');

// routes
const auth              = require('./routes/_auth');
const clients           = require('./routes/_clients');
const favorite_products = require('./routes/_favorite_products');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`, auth);
router.express.use(`${basePath}`, clients);
router.express.use(`${basePath}`, favorite_products);