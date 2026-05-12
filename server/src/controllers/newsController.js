const News = require("../models/newsModel.js");

// =========================
// CREATE NEWS
// =========================

exports.createNews = async (req, res) => {

  try {

    // Create new news document
    const news = await News.create(
      req.body
    );

    console.log(news);

    // Send created news
    res.json(news);

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message
    });
  }
};

// =========================
// GET ALL NEWS
// =========================

exports.getAllNews = async (req, res) => {

  try {

    // Get query parameters
    const { status, admin } =
      req.query;

    // Default filter object
    let filter = {};

    // Public users
    if (!admin) {

      // Get time before 24 hours
      const oneDayAgo = new Date();

      oneDayAgo.setHours(
        oneDayAgo.getHours() - 24
      );

      // Show only recent published news
      filter = {

        status: "published",

        updatedAt: {
          $gte: oneDayAgo
        },
      };
    }

    // Optional status filter
    if (status) {

      filter.status = status;
    }

    // Fetch filtered news
    const news = await News.find(filter)

      // Sort latest first
      .sort({
        updatedAt: -1
      });

    // Send response
    res.json(news);

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// GET SINGLE NEWS
// =========================

exports.getNewsById = async (
  req,
  res
) => {

  try {

    // Find news by id
    const news = await News.findById(
      req.params.id
    );

    // Send news data
    res.json(news);

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message
    });
  }
};

// =========================
// SEARCH NEWS
// =========================

exports.searchNews = async (
  req,
  res
) => {

  try {

    // Get search query
    const query = req.params.query;

    // Find matching published news
    const news = await News.find({

      status: "published",

      $or: [

        // Search by title
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },

        // Search by content
        {
          content: {
            $regex: query,
            $options: "i",
          },
        },

        // Search by category
        {
          category: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    })

    // Latest first
    .sort({
      updatedAt: -1
    });

    // Send response
    res.json(news);

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message,
    });
  }
};

// =========================
// UPDATE NEWS
// =========================

exports.updateNews = async (
  req,
  res
) => {

  try {

    // Update news by id
    const news =
      await News.findByIdAndUpdate(

        req.params.id,

        req.body,

        // Return updated document
        { new: true }
      );

    // Send updated news
    res.json(news);

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message
    });
  }
};

// =========================
// DELETE NEWS
// =========================

exports.deleteNews = async (
  req,
  res
) => {

  try {

    // Delete news by id
    await News.findByIdAndDelete(
      req.params.id
    );

    // Success response
    res.json({
      msg: "Deleted successfully"
    });

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message
    });
  }
};