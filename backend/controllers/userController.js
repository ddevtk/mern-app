const catchAsyncFn = require('../utils/catchAsyncFn');
const User = require('../model/userModel');
const generateToken = require('../utils/generateToken');

const authUser = catchAsyncFn(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    return res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  res.status(401);
  return next(new Error('Invalid email or password'));
});

const userProfile = catchAsyncFn(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      idAdmin: user.isAdmin,
    });
  }
  res.status(404);
  return next(new Error('User not found'));
});

const updateUserProfile = catchAsyncFn(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }
    const updateUser = await user.save();
    res.json({
      _id: updateUser._id,
      name: updateUser.name,
      email: updateUser.email,
      isAdmin: updateUser.isAdmin,
      token: generateToken(updateUser._id),
    });
  } else {
    res.status(404);
    return next(new Error('User not found'));
  }
});

const register = catchAsyncFn(async (req, res, next) => {
  const { name, email, password } = req.body;
  const existUser = await User.findOne({ email });
  if (existUser) {
    res.status(400);
    return next(new Error('Email already registered'));
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    return res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  }
  res.status(401);
  return next(new Error('Invalid user data'));
});

// Get all user ( admin only )
const getAllUser = catchAsyncFn(async (req, res, next) => {
  const users = await User.find({});
  res.json({
    result: users.length,
    users,
  });
});

module.exports = {
  authUser,
  userProfile,
  register,
  updateUserProfile,
  getAllUser,
};
