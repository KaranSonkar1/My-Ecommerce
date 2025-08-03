// config/razorpay.js
import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config(); // ensure env variables are loaded

export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// Safety check for missing keys
if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  console.error("❌ Razorpay API keys are missing in .env");
}
