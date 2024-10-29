const express = require("express");
const { signUp, logIn } = require("../controllers/authController");
const userVerification = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/register", signUp);
router.post("/login", logIn);
router.post("/", userVerification);

module.exports = router;
