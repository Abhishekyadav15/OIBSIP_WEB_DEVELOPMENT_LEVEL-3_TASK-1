const { Base, Sauce, Cheese, Veggie } = require("../schemas/inventorySchema");

const createPizzas = async () => {
  const base = await Base.findOne({ name: "Classic" });
  const tomatoSauce = await Sauce.findOne({ name: "Tomato" });
  const mozzarella = await Cheese.findOne({ name: "Mozzarella" });
  const parmesan = await Cheese.findOne({ name: "Parmesan" });
  const gorgonzola = await Cheese.findOne({ name: "Gorgonzola" });

  // Make sure these names exactly match the inventory
  const garlic = await Veggie.findOne({ name: "Garlic" });
  const basil = await Veggie.findOne({ name: "Basil" });
  const oregano = await Veggie.findOne({ name: "Oregano" });
  const artichokes = await Veggie.findOne({ name: "Artichokes" });
  const eggs = await Veggie.findOne({ name: "Eggs" });
  const bacon = await Veggie.findOne({ name: "Bacon" });

  return [
    {
      name: "Margherita",
      description: "Tomato sauce, mozzarella, and oregano",
      bases: [base?._id],
      sauces: [tomatoSauce?._id],
      cheeses: [mozzarella?._id],
      veggies: [oregano?._id],
      price: 6.95,
      size: "small",
      createdBy: "admin",
      imageUrl: "/public/images/p2.jpeg",
    },
    {
      name: "Marinara",
      description: "Tomato sauce, garlic and basil",
      bases: [base?._id],
      sauces: [tomatoSauce?._id],
      cheeses: [],
      veggies: [garlic?._id, basil?._id],
      price: 6.95,
      size: "small",
      createdBy: "admin",
      imageUrl: "/images/p3.jpeg",
    },
    {
      name: "Quattro Formaggi",
      description:
        "Tomato sauce, mozzarella, parmesan, gorgonzola cheese, artichokes and basil",
      bases: [base?._id],
      sauces: [tomatoSauce?._id],
      cheeses: [mozzarella?._id, parmesan?._id, gorgonzola?._id],
      veggies: [artichokes?._id, basil?._id],
      price: 8.95,
      size: "small",
      createdBy: "admin",
      imageUrl: "/images/p3.jpeg",
    },
    {
      name: "Carbonara",
      description: "Tomato sauce, mozzarella, parmesan, eggs, and bacon",
      bases: [base?._id],
      sauces: [tomatoSauce?._id],
      cheeses: [mozzarella?._id, parmesan?._id],
      veggies: [eggs?._id, bacon?._id],
      price: 8.95,
      size: "small",
      createdBy: "admin",
      imageUrl: "/images/p4.jpeg",
    },
  ];
};

module.exports = createPizzas;
