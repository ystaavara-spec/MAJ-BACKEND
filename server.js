const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// Simple test route
app.get("/", (req, res) => {
  res.send("SINX PRO API ONLINE 🚀");
});

// Health check (important for Render)
app.get("/status", (req, res) => {
  res.json({
    status: "ONLINE",
    time: new Date()
  });
});

// Example admin route (basic)
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return res.json({ success: true, message: "Login OK" });
  }

  return res.status(401).json({ success: false, message: "Invalid login" });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});