const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const chalk = require('chalk');
const app = express();

const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const globalErrorHandler = require('./middleware/errorMiddleware');

dotenv.config();

app.use(cors());
app.use(express.json());

connectDB();

app.get('/api', (req, res) => {
  res.send('API is running...');
});
app.use('/api/products', productRoutes);
app.use('/api/user', userRoutes);

app.all('*', (req, res, next) => {
  next(new Error(`Can't not find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () =>
  console.log(
    chalk.yellow.bold(
      `Server running in ${process.env.NODE_ENV} on port ${port}!`
    )
  )
);
