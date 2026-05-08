const News = require("../models/newsModel.js");

// CREATE
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    console.log(news)
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ALL (with status filter)
exports.getAllNews = async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status ? { status } : {};

    const news = await News.find(filter).sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET ONE
exports.getNewsById = async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// UPDATE
exports.updateNews = async (req, res) => {
  try {
    const news = await News.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE
exports.deleteNews = async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ msg: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};