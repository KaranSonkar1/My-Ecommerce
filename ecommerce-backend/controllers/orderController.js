import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const order = await Order.create({
      user: req.user._id,
      items: req.body.items,
      totalPrice: req.body.totalPrice,
    });
    res.status(201).json(order);
  } catch {
    res.status(500).json({ message: "Order failed" });
  }
};
