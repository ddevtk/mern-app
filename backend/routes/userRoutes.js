const express = require('express');
const router = express.Router();
const {
  authUser,
  userProfile,
  register,
  updateUserProfile,
} = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.route('/register').post(register);
router.route('/login').post(authUser);
router
  .route('/profile')
  .get(protect, userProfile)
  .put(protect, updateUserProfile);

module.exports = router;
