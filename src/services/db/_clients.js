"use strict"

// dependencies
const postgres = require('../connection/index');

const createClient = async ({name, email, password}) => {
  const query = `
    INSERT INTO clients 
      (name, email, password)
    VALUES 
      ($1, $2, $3) 
    RETURNING *;
  `;

  const values = [name, email, password];
  return await postgres.queryFirstOrNull(query, values);
};

const updateClient = async (id, { name, email, password }) => {
  const query = `
    UPDATE clients
    SET 
      name = $1,
      email = $2,
      password = $3,
      updated_at = NOW()
    WHERE id = $4
    RETURNING id, name, email, created_at, updated_at;
  `;

  const values = [name, email, password, id];
  return await postgres.queryFirstOrNull(query, values);
};

const getClients = async () => {
  const query = `
    SELECT 
      id, name, email, created_at, updated_at
    FROM 
      clients
  `;

  return await postgres.query(query);
};

const getClientById = async (id) => {
  const query = `
    SELECT 
      id, name, email, created_at, updated_at
    FROM 
      clients
    WHERE 
      id = $1
  `;

  const values = [id];
  return await postgres.queryFirstOrNull(query, values);
};

const deleteClient = async (id) => {
  const query = `
    DELETE FROM clients
    WHERE id = $1;
  `;

  const values = [id];
  return await postgres.queryFirstOrNull(query, values);
};

module.exports = {
  createClient,
  updateClient,
  getClientById,
  getClients,
  deleteClient
}