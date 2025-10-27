const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const { verifyToken } = require("./middlewares/authMiddleware");
const seedAdmin = require("./utils/seedAdmin"); 

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Run admin seed before the server starts
seedAdmin().then(() => {
  console.log("🔑 Admin seed check completed.");

  // Public routes
  app.use("/", authRoutes);

  // Protected routes
  app.get("/dashboard", verifyToken, (req, res) => {
    res.json({ message: "Welcome to Dashboard", user: req.user });
  });

  app.get("/usermanagement", verifyToken, (req, res) => {
    res.json({ message: "User Management Access", user: req.user });
  });

  app.get("/events", verifyToken, (req, res) => {
    res.json({ message: "events Access", user: req.user });
  });

  app.get("/notification", verifyToken, (req, res) => {
    res.json({ message: "notification Access", user: req.user });
  });


  app.get("/accesscontrol", verifyToken, (req, res) => {
    res.json({ message: "accesscontrol Access", user: req.user });
  });


  app.get("/support", verifyToken, (req, res) => {
    res.json({ message: "support Access", user: req.user });
  });

  app.get("/settings", verifyToken, (req, res) => {
    res.json({ message: "Settings Access", user: req.user });
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
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
