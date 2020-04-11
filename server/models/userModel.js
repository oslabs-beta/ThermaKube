const { Pool } = require('pg');
// url string to access database
const elephantSecret = require('../secret');

const pool = new Pool({
  connectionString: elephantSecret.url,
});

module.exports = {
  query: (text, params, callback) => {
    // console.log('exectued query', text);
    return pool.query(text, params, callback);
  },
};
