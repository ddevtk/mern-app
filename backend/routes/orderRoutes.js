const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.route('/:id').get(protect, getOrderById);
router.route('/add').post(protect, addOrderItems);

module.exports = router;
