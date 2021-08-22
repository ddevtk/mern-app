const express = require('express');
const catchAsyncFn = require('../utils/catchAsyncFn');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

router.use(protect);

router.get(
  '/',
  catchAsyncFn(async (req, res, next) => {
    console.log(req.user);
    const order = await Order.find({
      user: req.user._id,
    }).populate('user', 'email name');
    if (order[0]) {
      res.status(200).json(order);
    } else {
      res.status(404);
      return next(new Error('No order'));
    }
  })
);

module.exports = router;
