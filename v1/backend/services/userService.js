const pool = require("../db/pool");

async function findUserByEmail(email) {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
  return result.rows[0];
}

module.exports = { findUserByEmail };
