const express = require('express');
const router = express.Router();
const {
  addOrderItems,
  getOrderById,
  getMyOrder,
} = require('../controllers/orderController');
const protect = require('../middleware/authMiddleware');

router.route('/:id').get(protect, getOrderById);
router.route('/add').post(protect, addOrderItems);
router.route('/myOrder').post(protect, getMyOrder);

module.exports = router;
