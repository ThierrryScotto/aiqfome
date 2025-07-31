"use strict"

// helpers
const validator = require('../../helpers/validate.helpers');
const { getAllProductsFromExternalApi } = require('../../helpers/axios.helpers');

const getProducts = async (req, res) => {
  try {
    console.log("### HERE ###");

    const response = await getAllProductsFromExternalApi();
    const products = response.data;

    console.log("Products retrieved from external API:", products);

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(404).send({ message: "No products found" });
    }

    return res.status(200).send(products);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Error fetching products from external API" });
  }
};

module.exports = {
  getProducts
};
