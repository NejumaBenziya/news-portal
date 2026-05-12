// Import Express framework
const express = require("express");

// Import mongoose for MongoDB
const mongoose = require("mongoose");

// Import CORS middleware
const cors = require("cors");

// Import authentication routes
const authRoutes = require(
  "./src/routes/authRoutes.js"
);

// Import news routes
const newsRoutes = require(
  "./src/routes/newsRoutes.js"
);

// Load environment variables
require("dotenv").config();

// Create Express app
const app = express();

// =========================
// MongoDB Connection
// =========================

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
// Middlewares
// =========================

// Enable CORS
app.use(

  cors({

    // Allowed frontend origins
    origin: [

      "http://localhost:3000",

      "https://news-portal-plum-rho.vercel.app",
    ],

    // Allow credentials
    credentials: true,
  })
);

// Parse JSON request body
app.use(express.json());

// =========================
// Routes
// =========================

// Authentication routes
app.use(
  "/api/auth",
  authRoutes
);

// News routes
app.use(
  "/api/news",
  newsRoutes
);

// =========================
// Default Route
// =========================

app.get("/", (req, res) => {

  res.send("API Running");
});

// =========================
// Start Server
// =========================

app.listen(5000, () =>

  console.log(
    "Server running on port 5000"
  )
);