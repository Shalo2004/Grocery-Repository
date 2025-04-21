const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  price: Number,
  quantity: Number,
});

// The third argument "Products" specifies the collection name explicitly
const ProductModel = mongoose.model("Products", ProductSchema, "Products");

module.exports = ProductModel;

  
