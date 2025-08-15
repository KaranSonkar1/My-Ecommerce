import razorpay from "../config/razorpay.js";
import crypto from "crypto";
import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { amount, products } = req.body;
    if (!amount) return res.status(400).json({ message: "Amount required" });

    const order = await razorpay.orders.create({
      amount: amount * 100,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`
    });

    await Order.create({
      user: req.user._id,
      products,
      amount,
      razorpay_order_id: order.id
    });

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment initiation failed. Check credentials." });
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body)
    .digest("hex");

  if (expectedSignature === razorpay_signature) {
    const order = await Order.findOne({ razorpay_order_id });
    order.paymentStatus = "Completed";
    order.razorpay_payment_id = razorpay_payment_id;
    await order.save();
    res.json({ status: "success" });
  } else {
    res.status(400).json({ status: "failure" });
  }
};
