const express = require("express");

// Create Express router
const router = express.Router();

// Import auth controllers
const {
  login,
  changePassword
} = require(
  "../controllers/authController"
);

// Import authentication middleware
const auth = require(
  "../middleware/authMiddleware.js"
);

// =========================
// Admin Login Route
// =========================

router.post(
  "/login",
  login
);

// =========================
// Change Password Route
// Protected Route
// =========================

router.put(

  "/change-password",

  // Verify JWT token
  auth,

  // Controller
  changePassword
);

// Export router
module.exports = router;