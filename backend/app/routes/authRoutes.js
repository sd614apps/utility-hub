const { body } = require("express-validator");
const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware"); 
const pool = require("../config/db");


const router = express.Router();

router.post(
  "/register",
  [
    body("full_name").notEmpty().withMessage("Full name is required"),
    body("email").isEmail().withMessage("Valid email is required"),
    body("phone").isMobilePhone().withMessage("Valid phone number is required"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

router.post("/login", loginUser);

// GET /profile - Fetch user profile
router.get("/profile", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user; // User ID from authMiddleware
    const result = await pool.query(
      "SELECT id, full_name, email, phone, username, created_at FROM users WHERE id = $1",
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// PUT /profile - Update user profile
router.put("/profile", authMiddleware, async (req, res) => {
  try {
    const { userId } = req.user;
    const { full_name, email } = req.body;

    const result = await pool.query(
      "UPDATE users SET full_name = $1, email = $2 WHERE id = $3 RETURNING id, full_name, email, phone, username, created_at",
      [full_name, email, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
