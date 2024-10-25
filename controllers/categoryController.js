const Category = require("../models/categories");

const postCategories = async (req, res) => {
  try {
    const { title, keywords, filters } = req.body;
    const category = new Category({
      title,
      keywords,
      filters,
    });
    await category.save();
    res
      .status(200)
      .json({ message: "category created successfully", category });
  } catch (error) {
    console.log("Error creating categories", err);
    res
      .status(500)
      .json({ message: "Failed to create category", error: error });
  }
};

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ result: categories });
  } catch (error) {
    console.log("Error fetching categories:", error);
    res.status(500).json({ message: "Error fetching categories" });
  }
};

module.exports = { getCategories, postCategories };
