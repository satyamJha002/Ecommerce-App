const express = require("express");
const {
  addProduct,
  getProducts,
  productById,
} = require("../controllers/productController");
const router = express.Router();

router.post("/products", addProduct);
router.get("/products", getProducts);
router.get("/products/:id", productById);

module.exports = router;
