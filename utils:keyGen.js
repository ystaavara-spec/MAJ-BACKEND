function generateKey() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let key = "SINX_";
  for (let i = 0; i < 5; i++) {
    key += chars[Math.floor(Math.random() * chars.length)];
  }
  return key;
}

function getExpiry(days) {
  return Date.now() + days * 24 * 60 * 60 * 1000;
}

module.exports = { generateKey, getExpiry };