const express = require("express");

// Create Express router
const router = express.Router();

// Import news controllers
const {

  createNews,
  getAllNews,
  getNewsById,
  searchNews,
  updateNews,
  deleteNews,

} = require(
  "../controllers/newsController"
);

// Import authentication middleware
const auth = require(
  "../middleware/authMiddleware"
);

// =========================
// Protected Routes
// =========================

// Create News
router.post(
  "/",
  auth,
  createNews
);

// Update News
router.put(
  "/:id",
  auth,
  updateNews
);

// Delete News
router.delete(
  "/:id",
  auth,
  deleteNews
);

// =========================
// Public Routes
// =========================

// Get All News
router.get(
  "/",
  getAllNews
);

// Search News
router.get(
  "/search/:query",
  searchNews
);

// Get Single News
router.get(
  "/:id",
  getNewsById
);

// Export router
module.exports = router;