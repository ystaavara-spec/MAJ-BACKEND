const express = require("express");
const router = express.Router();
const Key = require("../models/Key");

// Generate key
router.post("/generate", async (req, res) => {
  const { duration } = req.body; // 1,7,30

  const key = "SINX-" + Math.random().toString(36).substring(2, 10).toUpperCase();

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + duration);

  const newKey = new Key({
    key,
    duration,
    expiresAt
  });

  await newKey.save();

  res.json({
    success: true,
    key,
    duration
  });
});

// Validate key
router.post("/validate", async (req, res) => {
  const { key } = req.body;

  const found = await Key.findOne({ key });

  if (!found) {
    return res.status(404).json({ valid: false, message: "Key not found" });
  }

  if (found.expiresAt < new Date()) {
    return res.status(403).json({ valid: false, message: "Key expired" });
  }

  res.json({ valid: true });
});

module.exports = router;