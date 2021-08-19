// const catchAsyncFn = require('../utils/catchAsyncFn');
const asyncHandler = require('express-async-handler');
const Order = require('../model/orderModel');

const addOrderItems = asyncHandler(async (req, res, next) => {
  console.log('hello');
  const { orderItems, shippingAddress, shippingPrice, itemPrices, totalPrice } =
    req.body;

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    itemPrices,
    shippingPrice,
    totalPrice,
  });
  const createOrder = await order.save();
  res.status(201).json(createOrder);
});

const getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.find({
    _id: req.params.id,
    user: req.user._id,
  }).populate('user', 'email name');
  if (order[0]) {
    return res.status(200).json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const getMyOrder = asyncHandler(async (req, res, next) => {
  const order = await Order.find({
    user: req.body.userId,
  }).populate('user', 'email name');
  if (order[0]) {
    res.status(200).json(order);
    console.log(order);
  } else {
    res.status(404);
    throw new Error('No order');
  }
});

module.exports = { addOrderItems, getOrderById, getMyOrder };
