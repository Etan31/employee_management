// utils/seedAdmin.js
const bcrypt = require("bcryptjs");
const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
});

async function seedAdmin() {
  const username = "admin";
  const email = "admin@gmail.com";
  const password = "admin";

  try {
    const existingUser = await pool.query("SELECT * FROM users WHERE email = $1", [email]);

    if (existingUser.rows.length > 0) {
      console.log("✅ Default admin user already exists.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query(
      `INSERT INTO users (username, email, password, role)
       VALUES ($1, $2, $3, $4)`,
      [username, email, hashedPassword, "admin"]
    );

    console.log("🎉 Default admin user created successfully!");
  } catch (error) {
    console.error("❌ Error seeding admin user:", error.message);
  }
}

module.exports = seedAdmin;
