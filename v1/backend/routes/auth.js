const express = require("express");
const router = express.Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/verify', verifyToken, (req, res) => {
  res.json({ success: true, message: 'Authenticated' });
});

const { registerUser, loginUser} = require("../controllers/authController");

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;