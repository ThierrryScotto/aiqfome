"use strict"

// Database
const clientDB = require("../../services/db/_clients");
const favoriteProductDB = require("../../services/db/_favorite_products");

const getFavoriteProductByClientId = async (req, res) => {
  const { clientId } = req.params;

  try {
    const client = await clientDB.getClientById(clientId);

    if (!client) {
      return res.status(404).send({ message: `Client id = ${clientId} not found` });
    }

    const favorites = await favoriteProductDB.getFavoriteProductByClientId(clientId);

    if (!favorites || favorites.length === 0) {
      return res.status(404).send({ message: `No favorite products found for client ${clientId}` });
    }

    return res.status(200).send(favorites);
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal server error occurred" });
  }
};

module.exports = {
  getFavoriteProductByClientId
}