const Product = require("../models/products");

const addProduct = async (req, res) => {
  try {
    const {
      title,
      category,
      price,
      rating,
      inStock,
      eta,
      filter1,
      filter2,
      images,
      specs,
    } = req.body;

    const newProduct = new Product({
      title,
      category,
      price,
      rating,
      inStock,
      eta,
      filter1,
      filter2,
      images,
      specs,
    });

    await newProduct.save();

    res
      .status(200)
      .json({ message: "Product is added successfully", newProduct });
  } catch (error) {
    console.log("Failed to added product", error);
    res.status(500).json({ message: "Failed to added product", error: error });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Successfully fetched", products });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch the product", error });
  }
};

module.exports = { addProduct, getProducts };
