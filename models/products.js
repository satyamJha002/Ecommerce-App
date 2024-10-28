const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: [0, "Price cannot be negative"],
  },
  rating: {
    type: Number,
    default: 0.0,
    min: [0],
    max: [5],
  },
  inStock: {
    type: Number,
    default: 20,
    min: [0],
  },
  eta: {
    type: Number,
    default: 20,
  },
  brand: {
    type: String,
  },
  color: {
    type: String,
  },
  images: [String],
  specs: [String],
});

const Products = mongoose.model("Products", productSchema);

module.exports = Products;
