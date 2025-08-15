import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: Number
    }
  ],
  amount: Number,
  paymentStatus: { type: String, default: "Pending" },
  razorpay_order_id: String,
  razorpay_payment_id: String,
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);
