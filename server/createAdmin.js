require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./src/models/userModel.js"); // adjust if needed

mongoose.connect(process.env.DB_CONNECTION_LINK)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

async function createAdmin() {
  try {
    const existing = await User.findOne({ email: "sulfinejuma@gmail.com" });

    if (existing) {
      console.log("Admin already exists");
      process.exit();
    }

    const hashed = await bcrypt.hash("leen@786", 10);

    await User.create({
      name: "Nejuma Benziya",
      email: "sulfinejuma@gmail.com",
      password: hashed,
    });

    console.log("Admin created");
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
}

createAdmin();