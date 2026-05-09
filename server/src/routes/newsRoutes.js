const express = require("express");
const router = express.Router();
const {
  createNews,
  getAllNews,
  getNewsById,
  searchNews,
  updateNews,
  deleteNews,
} = require("../controllers/newsController");

const auth = require("../middleware/authMiddleware");

// Protected routes
router.post("/", auth, createNews);
router.put("/:id", auth, updateNews);
router.delete("/:id", auth, deleteNews);

// Public routes
router.get("/", getAllNews);
router.get("/search/:query", searchNews);
router.get("/:id", getNewsById);

module.exports = router;