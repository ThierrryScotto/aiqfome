// Libs
const axios = require("axios");

require('dotenv').config();

const getProductFromExternalApi = async (productId) => {
  try {
    const response = await axios.get(`${process.env.EXTERNAL_API_URL}/${productId}`);
    const product = response.data;

    if (!product || !product.id) {
      return null;
    }

    return product;
  } catch (err) {
    if (err.response?.status === 404) {
      return null;
    }
    throw err;
  }
};

module.exports = {
  getProductFromExternalApi
};
