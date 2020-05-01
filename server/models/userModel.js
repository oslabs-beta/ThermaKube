const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.ELEPHANT_URL,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('exectued query', text);
    return pool.query(text, params, callback);
  },
};
