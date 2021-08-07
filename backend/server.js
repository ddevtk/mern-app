const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const chalk = require('chalk');
const app = express();

const productRoutes = require('./routes/productRoutes');

dotenv.config();

app.use(cors());
app.use(bodyParser.json());

connectDB();

app.get('/api', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRoutes);

app.all('*', (req, res, next) => {
  next(new Error(`Can't not find ${req.originalUrl} on this server`));
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} on port ${port}!`
    )
  )
);
