const express = require('express');
const router = express.Router();
const {
  getProductPerPage,
  getProductById,
  deleteProduct,
  updateProduct,
  createProduct,
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getProductPerPage).post(protect, admin, createProduct);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct);

module.exports = router;
