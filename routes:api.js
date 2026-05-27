const express = require("express");
const Key = require("../models/Key");

const router = express.Router();

router.post("/validate", async (req, res) => {
  const { key, ip } = req.body;

  const found = await Key.findOne({ key });

  if (!found)
    return res.json({ status: "error", message: "Key invalid" });

  if (Date.now() > found.expiresAt)
    return res.json({ status: "error", message: "Expired" });

  if (found.ip !== ip)
    return res.json({ status: "error", message: "IP not allowed" });

  found.status = "used";
  found.usedByIP = ip;
  found.usedAt = Date.now();
  await found.save();

  res.json({ status: "ok", message: "Access granted" });
});

module.exports = router;