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

// Root route
app.get("/", (req, res) => {
  res.send("🚀 SINX API ONLINE");
});

// Health check (Render important)
app.get("/status", (req, res) => {
  res.json({
    status: "ONLINE",
    uptime: process.uptime(),
    time: new Date()
  });
});

// Admin login (simple)
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    return res.json({
      success: true,
      message: "Login success"
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid credentials"
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found"
  });
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});