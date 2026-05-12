const mongoose = require("mongoose");

// =========================
// News Schema
// =========================

const newsSchema = new mongoose.Schema(

  {

    // News Title
    title: {

      type: String,

      required: [
        true,
        "title is required",
      ],
    },

    // News Content
    content: {

      type: String,

      required: [
        true,
        "content is required",
      ],
    },

    // News Category
    category: {

      type: String,

      required: [
        true,
        "category is required",
      ],

      // Allowed categories
      enum: [
        "General",
        "Tech",
        "Business",
        "Sports",
        "Entertainment",
        "Politics",
        "Health"
      ],

      // Default category
      default: "General",
    },

    // News Image URL
    image: {

      type: String,
    },

    // News Status
    status: {

      type: String,

      required: [
        true,
        "status is required",
      ],

      // Allowed status values
      enum: [
        "draft",
        "published",
        "scheduled",
        "in-review"
      ],

      // Default status
      default: "draft",
    },

  },

  // Automatically add createdAt & updatedAt
  {
    timestamps: true
  }
);

// =========================
// News Model
// =========================

const NewsModel = mongoose.model(
  "news",
  newsSchema
);

// Export model
module.exports = NewsModel;