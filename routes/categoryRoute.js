const express = require("express");
const {
  getCategories,
  postCategories,
} = require("../controllers/categoryController");
const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", postCategories);

module.exports = router;
