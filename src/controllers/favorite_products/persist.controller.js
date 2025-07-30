"use strict"

// Database
const clientDB = require("../../services/db/_clients");
const favoriteProductDB = require("../../services/db/_favorite_products");

// helpers
const validator = require('../../helpers/validate.helpers');
const { getProductFromExternalApi } = require('../../helpers/axios.helpers');

const _validateBody = (body) => {
  const createFavoriteProductSchema = {
    id: '/CreateFavoriteProduct',
    type: 'object',
    properties: {
      clientId: { type: 'number', },
      productId: { type: 'number' }
    },
    required: ['clientId', 'productId']
  };
  return validator.validate(createFavoriteProductSchema, body);
};

const createFavoriteProduct = async (req, res) => {
  const validatorResult = _validateBody(req.body);

  if (validatorResult.errors.length > 0) {
    return res.status(400).send({ message: `Invalid request body, error = ${validatorResult.errors}`});
  }

  const { clientId, productId } = validatorResult.instance;

  try {
    const client = await clientDB.getClientById(clientId);

    if (!client) {
      return res.status(404).send({ message: `Client id = ${clientId} not found` });
    }

    const product = await getProductFromExternalApi(productId);

    if (!product || !product.id) {
      return res.status(400).send({ message: "Invalid product" });
    }

    const existingFavorite = await favoriteProductDB.getFavoriteProductByClientId(clientId, productId);

    if (existingFavorite) {
      return res.status(409).send({ message: "Product already added to favorites" });
    }

    const newFavorite = {
      client_id: clientId,
      product_id: product.id,
      title: product.title,
      price: product.price,
      image_url: product.image,
      review_rate: product.rating?.rate || null,
      review_count: product.rating?.count || null,
    };

    const addedFavorite = await favoriteProductDB.createFavorite(newFavorite);

    return res.status(201).send(addedFavorite);
  } catch (err) {
    if (err.response?.status === 404) {
      return res.status(404).send({ message: "Product not found" });
    }

    console.error(err);
    return res.status(500).send({ message: "Internal server error occurred" });
  }
};

module.exports = {
  createFavoriteProduct
};
