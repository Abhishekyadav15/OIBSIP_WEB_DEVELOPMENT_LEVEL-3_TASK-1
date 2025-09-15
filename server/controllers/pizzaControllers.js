const asyncHandler = require("express-async-handler");
const Pizza = require("../schemas/pizzaSchema");

// @desc    Get all pizzas
// @route   GET /api/pizzas
// @access  Public
const getAllPizzas = asyncHandler(async (req, res) => {
  const pizzas = await Pizza.find({})
    .populate("bases", "name")
    .populate("sauces", "name")
    .populate("cheeses", "name")
    .populate("veggies", "name");

  res.status(200).json(pizzas);
});

// @desc    Get pizza by Id
// @route   GET /api/pizzas/:id
// @access  Public
const getPizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id)
    .populate("bases", "name")
    .populate("sauces", "name")
    .populate("cheeses", "name")
    .populate("veggies", "name");

  if (pizza) {
    res.status(200).json(pizza);
  } else {
    res.status(404);
    throw new Error("Pizza Not Found!");
  }
});

// @desc    Create a new pizza
// @route   POST /api/pizzas
// @access  Private (Admin only ideally)
const createPizza = asyncHandler(async (req, res) => {
  const pizza = new Pizza({
    name: req.body.name,
    description: req.body.description,
    bases: req.body.bases,
    sauces: req.body.sauces,
    cheeses: req.body.cheeses,
    veggies: req.body.veggies,
    price: req.body.price,
    size: req.body.size,
    createdBy: req.user.role || "admin",
    imageUrl: req.body.imageUrl,
  });

  const createdPizza = await pizza.save();
  res.status(201).json(createdPizza);
});

// @desc    Update pizza by Id
// @route   PUT /api/pizzas/:id
// @access  Private/Admin
const updatePizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findById(req.params.id);

  if (pizza) {
    pizza.name = req.body.name || pizza.name;
    pizza.description = req.body.description || pizza.description;
    pizza.bases = req.body.bases || pizza.bases;
    pizza.sauces = req.body.sauces || pizza.sauces;
    pizza.cheeses = req.body.cheeses || pizza.cheeses;
    pizza.veggies = req.body.veggies || pizza.veggies;
    pizza.price = req.body.price || pizza.price;
    pizza.size = req.body.size || pizza.size;
    pizza.imageUrl = req.body.imageUrl || pizza.imageUrl;

    const updatedPizza = await pizza.save();
    res.status(200).json(updatedPizza);
  } else {
    res.status(404);
    throw new Error("Pizza Not Found!");
  }
});

// @desc    Delete pizza by Id
// @route   DELETE /api/pizzas/:id
// @access  Private/Admin
const deletePizzaById = asyncHandler(async (req, res) => {
  const pizza = await Pizza.findByIdAndDelete(req.params.id);

  if (pizza) {
    res.status(200).json({ message: "Pizza Deleted Successfully!" });
  } else {
    res.status(404);
    throw new Error("Pizza Not Found!");
  }
});

module.exports = {
  getAllPizzas,
  getPizzaById,
  createPizza,
  updatePizzaById,
  deletePizzaById,
};
