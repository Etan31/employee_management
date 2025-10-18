require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { pool } = require("./db/pool");
const authRoutes = require("./routes/auth");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
