const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const { protect } = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * PUBLIC ROUTES
 */
router.get("/", getProducts);
router.get("/:id", getProductById);

/**
 * ADMIN ROUTES (JWT PROTECTED)
 */
router.post("/", protect, createProduct);
router.put("/:id", protect, updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
