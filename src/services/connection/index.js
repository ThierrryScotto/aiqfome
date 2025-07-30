const Pool = require('pg-pool');

require('dotenv').config();

let client;

const pool = new Pool({
  database                : process.env.DB_DATABASE,
  user                    : process.env.DB_USER,
  password                : process.env.DB_PASSWORD,
  port                    : process.env.DB_PORT,
  max                     : process.env.DB_MAX,
  idleTimeoutMillis       : process.env.DB_IDLE_TIMEOUT_MILLIS,
  connectionTimeoutMillis : process.env.DB_CONNECTION_TIMEOUT_MILLIS,
  maxUses                 : process.env.DB_MAX_USES
});

const _connetion = async () => {
  if (client == null) {
    client = await pool.connect();
  }
};

const queryFirstOrNull = async (query, params = []) => {
  await _connetion();

  return client.query(query, params)
    .then(result => {
      if (result.rowCount > 0) {
        return result.rows[0];
      }

      return null;
    })
    .catch(err => {
      return Promise.reject(err);
    })
};

const query = async (query, params = []) => {
  await _connetion();

  const result = await client.query(query, params);
  return result.rows;
}

const rollback = async () => {
  await _connect();

  return client.query('ROLLBACK')
    .then(result => {
      logger.info('poolWrite.transaction rollbacked');
      return result;
    })
    .catch(err => {
      return Promise.reject(err);
    });
};

module.exports = {
  queryFirstOrNull,
  query,
  rollback
};