const mongoose = require("mongoose");

const filterSchema = new mongoose.Schema({
  filterName: {
    type: String,
    required: true,
  },
  filterList: {
    type: [String],
    required: true,
  },
});

const categorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  keywords: {
    type: [String],
    default: [],
  },
  filters: {
    type: Map,
    of: filterSchema,
  },
});

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
