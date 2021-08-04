const mongoose = require('mongoose');
const chalk = require('chalk');
const dotenv = require('dotenv');
dotenv.config();

module.exports = connectDB = async () => {
  try {
    const DB = process.env.DB_NAME.replace(
      '<password>',
      process.env.DB_PASSWORD
    );

    await mongoose.connect(DB, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(chalk.yellow.bold('DB connection successful!'));
  } catch (error) {
    console.log(chalk.red.bold(`Error: ${error.message}`));
    process.exit(1);
  }
};
