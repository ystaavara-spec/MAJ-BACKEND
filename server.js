const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/auth");
const keyRoutes = require("./routes/keys");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB connect
connectDB();

// Routes
app.get("/", (req, res) => {
  res.send("SINX PRO API ONLINE 🚀");
});

app.get("/status", (req, res) => {
  res.json({ status: "ONLINE" });
});

app.use("/admin", authRoutes);
app.use("/keys", keyRoutes);

// Start
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on", PORT);
});
