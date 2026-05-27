const express = require("express");
const app = express();

app.use(express.json());

// =====================
// ROOT (NO NOT FOUND)
// =====================
app.get("/", (req, res) => {
  res.send("🚀 SINX API ONLINE");
});

// =====================
// STATUS
// =====================
app.get("/status", (req, res) => {
  res.json({
    status: "ONLINE",
    uptime: process.uptime(),
    time: new Date()
  });
});

// =====================
// HEALTH CHECK
// =====================
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// =====================
// LOGIN (ADMIN)
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
    username === "SINXPROXY" &&
    password === "SINXVIP777"
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
  console.log("🚀 Server running on port", PORT);
});
