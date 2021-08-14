const catchAsyncFn = require('../utils/catchAsyncFn');
const Order = require('../model/orderModel');

const addOrderItems = catchAsyncFn(async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    itemPrices,
    totalPrice,
  } = req.body;

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemPrices,
    shippingPrice,
    totalPrice,
  });
  const createOrder = await order.save();
  res.status(201).json(createOrder);
});

module.exports = { addOrderItems };
