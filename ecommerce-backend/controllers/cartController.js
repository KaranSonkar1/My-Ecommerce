import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id });
  if (!cart) cart = await Cart.create({ user: req.user._id, items: [] });

  const { productId, quantity } = req.body;
  const itemIndex = cart.items.findIndex((i) => i.product.toString() === productId);
  if (itemIndex > -1) cart.items[itemIndex].quantity += quantity;
  else cart.items.push({ product: productId, quantity });

  await cart.save();
  res.json(cart);
};
