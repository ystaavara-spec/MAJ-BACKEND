const express = require("express");

const app = express();
app.use(express.json());

// ROOT
app.get("/", (req, res) => {
  res.send("SINX API ONLINE 🚀");
});

// STATUS
app.get("/status", (req, res) => {
  res.json({ status: "ONLINE" });
});

// HEALTH
app.get("/health", (req, res) => {
  res.json({ ok: true });
});

// LOGIN (STATIC SAFE)
app.post("/admin/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "SINXPROXY" && password === "SINXVIP777") {
    return res.json({ success: true });
  }

  return res.status(401).json({ success: false });
});

// START SERVER (IMPORTANT)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
