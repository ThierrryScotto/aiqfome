"use strict"

// dependencies
const postgres = require('../connection/index');

const createFavoriteProduct = async ({ client_id, product_id, title, price, image_url, review_rate, review_count }) => {
  const query = `
    INSERT INTO favorite_products
      (client_id, product_id, title, price, image_url, review_rate, review_count)
    VALUES
      ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;

  const values = [client_id, product_id, title, price, image_url, review_rate, review_count];
  return await postgres.queryFirstOrNull(query, values);
};

const getFavoriteProductByIds = async (client_id, product_id) => {
  const query = `
    SELECT
      product_id AS productId,
      title,
      price,
      image_url AS imageUrl,
      review_rate AS reviewRate,
      review_count AS reviewCount,
      created_at AS createdAt
    FROM
      favorite_products
    WHERE
      client_id = $1 AND product_id = $2
  `;

  const values = [client_id, product_id];
  return await postgres.queryFirstOrNull(query, values);
};

const getFavoriteProductByClientId = async (client_id) => {
  const query = `
    SELECT
      product_id AS productId,
      title,
      price,
      image_url AS imageUrl,
      review_rate AS reviewRate,
      review_count AS reviewCount,
      created_at AS createdAt
    FROM
      favorite_products
    WHERE
      client_id = $1
  `;

  const values = [client_id];
  return await postgres.query(query, values);
};

module.exports = {
  createFavoriteProduct,
  getFavoriteProductByIds,
  getFavoriteProductByClientId
}