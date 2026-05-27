const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =====================
// MongoDB CONNECTION
// =====================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ Mongo Error:", err));

// =====================
// ROOT ROUTE (NO NOT FOUND)
// =====================
app.get("/", (req, res) => {
  res.send("🚀 SINX API ONLINE");
});

// =====================
// STATUS ROUTE
// =====================
app.get("/status", (req, res) => {
  res.json({
    status: "ONLINE",
    uptime: process.uptime(),
    time: new Date()
  });
});

// =====================
// ADMIN LOGIN
// =====================
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing credentials"
    });
  }

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

// =====================
// HEALTH CHECK (Render safe)
// =====================
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// =====================
// 404 HANDLER
// =====================
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found",
    path: req.path
  });
});

// =====================
// START SERVER
// =====================
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
