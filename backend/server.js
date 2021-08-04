const express = require('express');
const products = require('./data/products');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const chalk = require('chalk');

const app = express();
dotenv.config();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.status(200).json(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} on port ${port}!`
    )
  )
);
