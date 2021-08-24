const express = require('express');
const router = express.Router();
const {
  getProductPerPage,
  getProductById,
  deleteProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProductPerPage);
router.route('/:id').get(getProductById).delete(protect, admin, deleteProduct);

module.exports = router;
