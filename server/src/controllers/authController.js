const User = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// JWT secret key from environment variables
const jwt_secret = process.env.JWT_SECRET;

// =========================
// Admin Login
// =========================

exports.login = async (req, res) => {

    try {

        // Get email & password from request body
        const { email, password } = req.body;

        // Find admin by email
        const admin = await User.findOne({ email });

        // Check if admin exists
        if (!admin)

            return res.status(400).json({
                msg: "User not found"
            });

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            admin.password
        );

        // Invalid password
        if (!isMatch)

            return res.status(400).json({
                msg: "Invalid credentials"
            });

        // Generate JWT token
        const token = jwt.sign(

            // Payload
            { id: admin._id },

            // Secret key
            process.env.JWT_SECRET,

            // Token expiration
            { expiresIn: "1d" }
        );

        // Send response
        res.json({

            token,

            admin: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
            },
        });

    } catch (err) {

        // Server error
        res.status(500).json({
            error: err.message
        });
    }
};

// =========================
// Change Password
// =========================

exports.changePassword = async (req, res) => {

  try {

    // Get passwords from request body
    const {
      oldPassword,
      newPassword
    } = req.body;

    // Find logged-in admin
    const admin = await User.findById(
      req.user.id
    );

    // Compare old password
    const isMatch = await bcrypt.compare(
      oldPassword,
      admin.password
    );

    // Invalid old password
    if (!isMatch) {

      return res.status(400).json({
        message: "Old password incorrect",
      });
    }

    // Hash new password
    const hashedPassword =
      await bcrypt.hash(newPassword, 10);

    // Update password
    admin.password = hashedPassword;

    // Save updated admin
    await admin.save();

    // Success response
    res.json({
      message: "Password updated",
    });

  } catch (err) {

    // Server error
    res.status(500).json({
      error: err.message,
    });
  }
};