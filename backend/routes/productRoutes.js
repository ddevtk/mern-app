const express = require('express');
const router = express.Router();
const {
  getProductPerPage,
  getProductById,
} = require('../controllers/productController');

router.route('/').get(getProductPerPage);
router.route('/:id').get(getProductById);

module.exports = router;
