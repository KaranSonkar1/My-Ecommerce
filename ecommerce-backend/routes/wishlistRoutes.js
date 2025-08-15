import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Wishlist from "../models/Wishlist.js";

const router = express.Router();

// Get wishlist
router.get("/", protect, async (req, res) => {
  const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("products");
  res.json(wishlist || { products: [] });
});

// Add to wishlist
router.post("/add", protect, async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
  await wishlist.save();
  res.json(wishlist);
});

// Remove from wishlist
router.post("/remove", protect, async (req, res) => {
  const { productId } = req.body;
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) return res.status(404).json({ message: "Wishlist not found" });
  wishlist.products = wishlist.products.filter(p => p.toString() !== productId);
  await wishlist.save();
  res.json(wishlist);
});

export default router;
