import Wishlist from "../models/Wishlist.js";

export const toggleWishlist = async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  if (!wishlist) wishlist = await Wishlist.create({ user: req.user._id, products: [] });

  const { productId } = req.body;
  if (wishlist.products.includes(productId)) {
    wishlist.products = wishlist.products.filter((p) => p.toString() !== productId);
  } else {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  res.json(wishlist);
};
