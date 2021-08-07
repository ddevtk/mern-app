const catchAsyncFn = require('../utils/catchAsyncFn');
const Product = require('../model/productModel');

const getAllProduct = catchAsyncFn(async (req, res, next) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

const getProductById = catchAsyncFn(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error('Could not found product with that ID'));
  }
  res.status(200).json(product);
});
module.exports = { getAllProduct, getProductById };
