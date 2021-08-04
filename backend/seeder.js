const mongoose = require('mongoose');
const chalk = require('chalk');
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./model/user.model');
const Product = require('./model/product.model');
const Order = require('./model/order.model');
const users = require('./data/users');
const products = require('./data/products');

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((p) => {
      return {
        ...p,
        user: adminUser,
      };
    });
    await Product.insertMany(sampleProducts);
    console.log(chalk.yellow.bold('Data inserted successfully'));
    process.exit();
  } catch (error) {
    console.log(chalk.red.bold(`${error}`));
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Order.deleteMany();

    console.log(chalk.yellow.bold('Data destroyed successfully'));
    process.exit();
  } catch (error) {
    console.log(chalk.red.bold(`${error}`));
    process.exit(1);
  }
};

if (process.argv[2] === '--d') {
  destroyData();
} else {
  importData();
}
