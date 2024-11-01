const Cart = require("../models/cart");
const Products = require("../models/products");

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findById(req.params.id).populate("items.productId");

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to retrieve Cart" });
  }
};

const createCart = async (req, res) => {
  try {
    const { items, total } = req.body;
    const newCart = new Cart({ items, total });
    await newCart.save();

    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to create cart" });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findById(req.params.id);

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemsIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemsIndex) {
      cart.items[itemsIndex].quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    const product = await Products.findById(productId);
    cart.total += product.price * quantity;

    await cart.save();
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to add to cart" });
  }
};

module.exports = { getCart, createCart, addToCart };
