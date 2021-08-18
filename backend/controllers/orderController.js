const catchAsyncFn = require('../utils/catchAsyncFn');
const Order = require('../model/orderModel');

const addOrderItems = catchAsyncFn(async (req, res, next) => {
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

const getOrderById = catchAsyncFn(async (req, res, next) => {
  console.log(req.params.id);
  const order = await Order.find({
    _id: req.params.id,
    user: req.body.userId,
  }).populate('user', 'email name');
  if (!order[0]) {
    res.status(404);
    return next(new Error('Order not found'));
  }
  return res.status(200).json(order);
});

module.exports = { addOrderItems, getOrderById };
