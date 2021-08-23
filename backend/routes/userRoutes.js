const express = require('express');
const router = express.Router();
const {
  authUser,
  userProfile,
  register,
  updateUserProfile,
  getAllUser,
  deleteUser,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/register').post(register);
router.route('/login').post(authUser);
router.route('/').get(protect, admin, getAllUser);
router
  .route('/profile')
  .get(protect, userProfile)
  .put(protect, updateUserProfile);

router.route('/:id').delete(protect, admin, deleteUser);

module.exports = router;
