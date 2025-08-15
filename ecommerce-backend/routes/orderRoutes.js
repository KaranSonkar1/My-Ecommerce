import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Order from "../models/Order.js";

const router = express.Router();

// Get all orders for user
router.get("/", protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).populate("products.product");
  res.json(orders);
});

// Get single order
router.get("/:id", protect, async (req, res) => {
  const order = await Order.findById(req.params.id).populate("products.product");
  if (!order) return res.status(404).json({ message: "Order not found" });
  res.json(order);
});

export default router;
