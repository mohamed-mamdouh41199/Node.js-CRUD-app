const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create User schema
const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  color: { type: String, required: false }
});

module.exports = mongoose.model('Product', productSchema);