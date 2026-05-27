const mongoose = require("mongoose");

const KeySchema = new mongoose.Schema({
  key: String,
  duration: Number, // 1,7,30 days
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  used: { type: Boolean, default: false }
});

module.exports = mongoose.model("Key", KeySchema);
