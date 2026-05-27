const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
  key: String,
  ip: String,
  duration: Number,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Number,
  usedByIP: String,
  usedAt: Number
});

module.exports = mongoose.model("Key", KeySchema);