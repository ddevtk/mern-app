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

const getOrderById = catchAsyncFn(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'email name'
  );
  if (order) {
    return res.status(200).json(order);
  }
  res.status(404);
  return next(new Error('Order not found'));
});

const updateOrderToPaid = catchAsyncFn(async (req, res, next) => {
  const updateOrder = await Order.findByIdAndUpdate(req.params.id, {
    idPaid: true,
    paidAt: Date.now(),
    paymentResults: {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress,
    },
  });

  if (updateOrder) {
    return res.status(200).json(updateOrder);
  }
  res.status(404);
  return next(new Error('Order not found'));
});

module.exports = { addOrderItems, getOrderById, updateOrderToPaid };
