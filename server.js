require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const auth = require("./routes/auth");
const admin = require("./routes/admin");
const api = require("./routes/api");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/auth", auth);
app.use("/admin", admin);
app.use("/api", api);

app.get("/", (req, res) => {
  res.json({
    status: "ONLINE",
    service: "SINX PRO",
    version: "1.0.0"
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("SINX PRO RUNNING"));