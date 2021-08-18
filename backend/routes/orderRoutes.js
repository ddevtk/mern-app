const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.route('/add').post(protect, addOrderItems);
router.route('/:id').post(protect, getOrderById);

module.exports = router;
