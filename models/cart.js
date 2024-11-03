const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  total: {
    type: Number,
    default: 0,
    required: true,
  },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
