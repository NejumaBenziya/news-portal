const mongoose = require("mongoose");

// =========================
// User Schema
// =========================

const userSchema = new mongoose.Schema(

  {

    // User Name
    name: {

      type: String,

      required: [
        true,
        "name is required"
      ],
    },

    // User Email
    email: {

      type: String,

      required: [
        true,
        "Email is required"
      ],

      // Prevent duplicate emails
      unique: true,

      // Convert email to lowercase
      lowercase: true
    },

    // User Password
    password: {

      type: String,

      required: [
        true,
        "password is required"
      ],
    },

  },

  // Automatically add createdAt & updatedAt
  {
    timestamps: true
  }
);

// =========================
// User Model
// =========================

const UserModel = mongoose.model(
  "user",
  userSchema
);

// Export model
module.exports = UserModel;