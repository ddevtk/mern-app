const catchAsyncFn = require('../utils/catchAsyncFn');
const Product = require('../model/productModel');

const getProductPerPage = catchAsyncFn(async (req, res, next) => {
  const current = +req.query.page || 1;
  const limit = +req.query.limit || 4;
  const skip = (current - 1) * limit;
  const allProducts = await Product.find({});
  const products = await Product.find({}).skip(skip).limit(limit);
  res.status(200).json({
    allProduct: allProducts.length,
    products,
  });
});

const getProductById = catchAsyncFn(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error('Could not found product with that ID'));
  }
  res.status(200).json(product);
});
module.exports = { getProductPerPage, getProductById };
