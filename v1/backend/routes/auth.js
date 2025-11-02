const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');
const { registerUser, loginUser} = require("../controllers/authController");
const { addEmployee } = require("../controllers/addEmployee");

router.get("/verify", verifyToken, (req, res) => {
  res.json({ success: true, user: req.user });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/addemployee", addEmployee);

module.exports = router;