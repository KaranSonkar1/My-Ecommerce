import { useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // ✅ Load Razorpay script once when component mounts
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      // ✅ Backend already multiplies by 100, so send plain total
      const { data } = await axios.post("http://localhost:5000/api/payment/order", {
        amount: total,
      });

      if (!data.id) {
        alert("Payment order creation failed");
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // ✅ from frontend .env
        amount: data.amount,
        currency: "INR",
        name: "My Store",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post("http://localhost:5000/api/payment/verify", {
              ...response,
              cart,
            });
            clearCart();
            window.location.href = "/order-success";
          } catch (err) {
            console.error("Payment verification failed", err);
            alert("Payment verification failed");
          }
        },
        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Error initiating payment", err);
      alert("Payment initiation failed");
    }
  };

  if (cart.length === 0) {
    return <p className="p-6">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">Total: ₹{total}</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Pay Now
      </button>
    </div>
  );
}
