const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

const connectDb = require('./config/db');

const Admin = require('./schemas/adminUserSchema');
const User = require('./schemas/userSchema');
const Pizza = require('./schemas/pizzaSchema');
const Order = require('./schemas/orderSchema');
const { Base, Sauce, Cheese, Veggie } = require('./schemas/inventorySchema');

const { users, admins } = require('./data/users');
const createPizzas = require('./data/pizzas');
const { base, sauce, cheese, veggie } = require('./data/inventory');

dotenv.config();

// Connect to MongoDB
connectDb();

const importData = async () => {
  try {
    console.log("Seeding database...".yellow);

    // 1️⃣ First clear old data
    await Promise.all([
      User.deleteMany(),
      Admin.deleteMany(),
      Base.deleteMany(),
      Sauce.deleteMany(),
      Cheese.deleteMany(),
      Veggie.deleteMany(),
      Pizza.deleteMany(),
    ]);

    // 2️⃣ Insert base collections
    await User.insertMany(users);
    await Admin.insertMany(admins);
    const bases = await Base.insertMany(base);
    const sauces = await Sauce.insertMany(sauce);
    const cheeses = await Cheese.insertMany(cheese);
    const veggies = await Veggie.insertMany(veggie);

    console.log("✅ Inventory seeded".green);

    // 3️⃣ Create pizzas with references
    const pizzas = await createPizzas();

    // sanity check
    if (!pizzas || pizzas.length === 0) {
      console.log("⚠️ No pizzas created. Check inventory names!".red);
    } else {
      await Pizza.insertMany(pizzas);
      console.log("🍕 Pizzas seeded successfully".green);
    }

    console.log("🎉 Dummy Data Created!".cyan.inverse);
    process.exit();
  } catch (error) {
    console.error(`❌ Error: ${error}`.red.inverse);
    process.exit(1);
  }
};

module.exports = importData;

const destroyData = async () => {
  try {
    await Admin.deleteMany();
    await Order.deleteMany();
    await Pizza.deleteMany();
    await User.deleteMany();
    await Base.deleteMany();
    await Sauce.deleteMany();
    await Cheese.deleteMany();
    await Veggie.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
