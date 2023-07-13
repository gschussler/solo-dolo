const path = require('path');
require('dotenv').config({
  override: true,
  path: path.resolve(__dirname, '../dev.env')
})

const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

// --> test validity of pool info

// (async () => {
//   try {
//     const { rows } = await pool.query('SELECT current_user');
//     const currentUser = rows[0]['current_user']
//     console.log(`Current user: '${currentUser}'`)
//   } catch (err) {
//     console.error(err)
//   }
// })();

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};