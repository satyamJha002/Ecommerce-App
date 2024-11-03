const express = require("express");
const { signUp, logIn, getUser } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.get("/getuser", protect, getUser);

module.exports = router;
