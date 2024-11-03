const express = require("express");
const {
  getCartItems,
  addCartItems,
  removeItemFromCart,
} = require("../controllers/cartController");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

router.route("/:id").get(protect, getCartItems).post(protect, addCartItems);
router.route("/:userId/:itemId").delete(protect, removeItemFromCart);

module.exports = router;
