const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./src/routes/authRoutes.js");
const newsRoutes = require("./src/routes/newsRoutes.js");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.DB_CONNECTION_LINK)
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/news", newsRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

app.listen(5000, () => console.log("Server running on port 5000"));