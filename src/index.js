"use strict"

// dependecies
const router = require('./routes/index');

// routes
const clients   = require('./routes/_clients');
const favorite_products  = require('./routes/_favorite_products');

// constant
const basePath = '/v1';

router.express.use(`${basePath}`, clients);
router.express.use(`${basePath}`, favorite_products);