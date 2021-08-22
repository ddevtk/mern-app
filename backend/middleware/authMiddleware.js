const jwt = require('jsonwebtoken');
const User = require('../model/userModel');
const catchAsyncFn = require('../utils/catchAsyncFn');

const protect = catchAsyncFn(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = await jwt.verify(token, process.env.JWT_SK);
      req.user = await User.findById(decoded.id).select('-password');
      next();
    } catch (error) {
      res.status(401);
      return next(new Error('No authorized, token failed'));
    }
  }
  if (!token) {
    res.status(401);
    return next(new Error('No authorized, no token'));
  }
});

const admin = catchAsyncFn(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    return next(new Error('Not authorized as an admin'));
  }
});

module.exports = { admin, protect };
