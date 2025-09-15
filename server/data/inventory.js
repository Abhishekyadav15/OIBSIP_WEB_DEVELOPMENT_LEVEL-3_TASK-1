// data/inventory.js

const base = [
  { name: 'Classic', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Thin', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Thick', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Cheese Stuffed', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Deep Dish', quantity: 100, price: 0.1, threshold: 10 },
];

const sauce = [
  { name: 'Tomato', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Pesto', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Alfredo', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'BBQ', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Buffalo', quantity: 100, price: 0.1, threshold: 10 },
];

const cheese = [
  { name: 'Mozzarella', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Parmesan', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Cheddar', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Feta', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Gorgonzola', quantity: 100, price: 0.1, threshold: 10 },
];

const veggie = [
  { name: 'Artichokes', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Basil', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Oregano', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Garlic', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Eggs', quantity: 100, price: 0.1, threshold: 10 },
  { name: 'Bacon', quantity: 100, price: 0.1, threshold: 10 },
];

module.exports = { base, sauce, cheese, veggie };
