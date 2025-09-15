const mongoose = require('mongoose');

// Base Schema
const baseSchema = new mongoose.Schema({
  name: { type: String, required: true },   // ✅ use "name"
  quantity: Number,
  price: Number,
  threshold: Number,
});

// Sauce Schema
const sauceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: Number,
  threshold: Number,
});

// Cheese Schema
const cheeseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: Number,
  threshold: Number,
});

// Veggie Schema
const veggieSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: Number,
  price: Number,
  threshold: Number,
});

// Export models
const Base = mongoose.model('Base', baseSchema);
const Sauce = mongoose.model('Sauce', sauceSchema);
const Cheese = mongoose.model('Cheese', cheeseSchema);
const Veggie = mongoose.model('Veggie', veggieSchema);

module.exports = { Base, Sauce, Cheese, Veggie };
