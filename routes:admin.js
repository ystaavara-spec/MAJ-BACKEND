const express = require("express");
const Key = require("../models/Key");
const { generateKey, getExpiry } = require("../utils/keyGen");

const router = express.Router();

// SIMPLE AUTH (token check removed for simplicity clean deploy)

router.post("/generate", async (req, res) => {
  const { ip, days } = req.body;

  const key = generateKey();

  const data = await Key.create({
    key,
    ip,
    duration: days,
    expiresAt: getExpiry(days)
  });

  res.json(data);
});

router.get("/keys", async (req, res) => {
  const keys = await Key.find();
  res.json(keys);
});

module.exports = router;