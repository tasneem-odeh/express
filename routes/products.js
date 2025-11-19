const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");
const { query, param, body } = require("express-validator");
const validateInput = require("../middlewares/validateInput");

// GET /products?limit=10&page=1
router.get(
  "/",
  [
    query("limit")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Limit must be a positive number"),
    query("page")
      .optional()
      .isInt({ min: 1 })
      .withMessage("Page must be a positive number"),
  ],
  validateInput,
  productsController.getProducts
);

// GET /products/:id
router.get(
  "/:id",
  [
    param("id")
      .isInt({ min: 1 })
      .withMessage("Product ID must be a positive number"),
  ],
  validateInput,
  productsController.getProductById
);

// POST /products
router.post(
  "/",
  [
    body("name").isString().notEmpty().withMessage("Name is required"),
    body("price").isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("quantity").isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
  ],
  validateInput,
  productsController.createProduct
);

// PUT /products/:id
router.put(
  "/:id",
  [
    param("id").isInt({ min: 1 }).withMessage("Product ID must be a positive number"),
    body("name").optional().isString().notEmpty().withMessage("Name cannot be empty"),
    body("price").optional().isFloat({ min: 0 }).withMessage("Price must be a positive number"),
    body("quantity").optional().isInt({ min: 0 }).withMessage("Quantity must be a non-negative integer"),
  ],
  validateInput,
  productsController.updateProduct
);

// DELETE /products/:id
router.delete(
  "/:id",
  [
    param("id").isInt({ min: 1 }).withMessage("Product ID must be a positive number"),
  ],
  validateInput,
  productsController.deleteProduct
);

module.exports = router;
