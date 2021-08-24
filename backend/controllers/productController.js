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
  // console.log(req.params.id);
  if (!product) {
    res.status(404);
    return next(new Error('Could not found product with that ID'));
  }
  res.status(200).json(product);
});

const deleteProduct = catchAsyncFn(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (product) {
    res.json({ message: 'Delete successfully ' });
  } else {
    res.status(404);
    return next(new Error('Product not found'));
  }
});

const updateProduct = catchAsyncFn(async (req, res, next) => {
  const { name, image, price, description, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name || product.name;
    product.image = image || product.image;
    product.price = price || product.price;
    product.description = description || product.description;
    product.brand = brand || product.brand;
    product.category = category || product.category;
    product.countInStock = countInStock || product.countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    return next(new Error('Product not found'));
  }
});
const createProduct = catchAsyncFn(async (req, res, next) => {
  // const { name, image, price, description, brand, category, countInStock } =
  //   req.body;

  const newProduct = new Product({
    user: req.user._id,
    name: 'Sample product',
    image: '/images/sample.jpg',
    price: 1890000,
    description: 'Sample description',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 2,
    numReviews: 0,
  });

  const createdProduct = await newProduct.save();
  res.json(createdProduct);
});

module.exports = {
  getProductPerPage,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
};
