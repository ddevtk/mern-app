const express = require('express');
const Product = require('../model/productModel');
const router = express.Router();

const catchAsyncFn = require('../utils/catchAsyncFn');

router.get(
  '/',
  catchAsyncFn(async (req, res, next) => {
    const products = await Product.find({});
    res.status(200).json(products);
  })
);

router.get(
  '/:id',
  catchAsyncFn(async (req, res, next) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
      res.status(404);
      return next(new Error('Could not found product with that ID'));
    }
    res.status(200).json(product);
  })
);

module.exports = router;
