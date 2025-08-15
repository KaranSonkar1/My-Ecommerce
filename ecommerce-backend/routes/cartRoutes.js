import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Cart from "../models/Cart.js";

const router = express.Router();

// Get user cart
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate("products.product");
  res.json(cart || { products: [] });
});

// Add product to cart
router.post("/add", protect, async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, products: [] });

  const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
  if (itemIndex > -1) {
    cart.products[itemIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }
  await cart.save();
  res.json(cart);
});

// Remove product from cart
router.post("/remove", protect, async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  if (!cart) return res.status(404).json({ message: "Cart not found" });
  cart.products = cart.products.filter(p => p.product.toString() !== productId);
  await cart.save();
  res.json(cart);
});

export default router;
