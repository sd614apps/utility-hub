const pool = require("../config/db");
const bcrypt = require("bcrypt");

class User {
  // Create a new user
  static async create({ fullName, email, phone, username, password }) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      "INSERT INTO users (full_name, email, phone, username, password) VALUES ($1, $2, $3, $4, $5) RETURNING id, full_name, email, phone, username, created_at",
      [fullName, email, phone, username, hashedPassword]
    );
    return result.rows[0];
  }

  // Find a user by email
  static async findByEmail(email) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
    return result.rows[0];
  }

  // Find a user by username
  static async findByUsername(username) {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    return result.rows[0];
  }

  // Find a user by phone
  static async findByPhone(phone) {
    const result = await pool.query("SELECT * FROM users WHERE phone = $1", [phone]);
    return result.rows[0];
  }

  // Compare a password with the hashed password
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;
