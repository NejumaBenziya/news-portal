// Load environment variables
require("dotenv").config();

// Import mongoose
const mongoose = require("mongoose");

// Import bcrypt for password hashing
const bcrypt = require("bcryptjs");

// Import User model
const User = require(
  "./src/models/userModel.js"
);

// Connect MongoDB
mongoose.connect(
  process.env.DB_CONNECTION_LINK
)

.then(() =>
  console.log("DB Connected")
)

.catch((err) =>
  console.log(err)
);

// =========================
// Create Admin Function
// =========================

async function createAdmin() {

  try {

    // Check if admin already exists
    const existing =
      await User.findOne({

        email:
          "sulfinejuma@gmail.com"
      });

    // Prevent duplicate admin creation
    if (existing) {

      console.log(
        "Admin already exists"
      );

      process.exit();
    }

    // Hash password
    const hashed =
      await bcrypt.hash(
        "leen@786",
        10
      );

    // Create admin user
    await User.create({

      name: "Nejuma Benziya",

      email:
        "sulfinejuma@gmail.com",

      password: hashed,
    });

    // Success message
    console.log("Admin created");

    process.exit();

  } catch (err) {

    // Error handling
    console.log(err);

    process.exit(1);
  }
}

// Run function
createAdmin();