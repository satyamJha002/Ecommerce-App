const Cart = require("../models/cart");
const Products = require("../models/products");
const asyncHandler = require("express-async-handler");

const getCartItems = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const cart = await Cart.findOne({ user: id }).populate(
    "items.productId",
    "name price"
  );

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  if (cart) {
    res.status(200).json({ success: true, cart });
  } else {
    res
      .status(500)
      .json({ success: false, message: "Error fetching cart items", error });
  }
});

const addCartItems = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ user: id });

  if (!cart) {
    cart = new Cart({ user: id, items: [], total: 0 });
  }

  const itemsIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  if (itemsIndex > -1) {
    cart.items[itemsIndex].quantity += quantity;
  } else {
    cart.items.push({ productId, quantity });
  }

  const product = await Products.findById(productId);
  cart.total += product.price * quantity;

  await cart.save();

  if (cart) {
    return res.status(200).json({ success: true, cart });
  } else {
    return res
      .status(500)
      .json({ message: "Error adding item to cart", error });
  }
});

const removeItemFromCart = asyncHandler(async (req, res) => {
  const { userId, itemId } = req.params;

  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({ success: false, message: "Cart not found" });
  }

  const itemsIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemsIndex > -1) {
    const product = await Products.findById(cart.items[itemsIndex].productId);
    cart.total -= product.price * cart.items[itemsIndex].quantity;
    cart.items.splice(itemsIndex, 1);
    await cart.save();

    res.status(200).json({ success: true, cart });
  } else {
    res.status(404).json({ success: false, message: "Item not found in cart" });
  }
});

module.exports = { getCartItems, addCartItems, removeItemFromCart };
