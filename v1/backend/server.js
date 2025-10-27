const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middlewares/authMiddleware");
const cookieParser = require("cookie-parser");


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/auth/check", verifyToken, (req, res) => {
  res.json({ valid: true, user: req.user });
});


// ✅ Correct single CORS configuration
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    // your frontend origin (Vite default)
    credentials: true, // allow sending cookies
  })
);

// Public auth routes
app.use("/", authRoutes);

// Protected routes
app.get("/dashboard", verifyToken, (req, res) => {
  res.json({ message: "Welcome to Dashboard", user: req.user });
});

app.get("/usermanagement", verifyToken, (req, res) => {
  res.json({ message: "User Management Access", user: req.user });
});

app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
  res.json({ message: "Logged out successfully" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
