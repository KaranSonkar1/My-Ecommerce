import express from "express";
import { createProduct, getProducts, getProductById } from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/", protect, createProduct); // only admin/protected can add products

export default router;
