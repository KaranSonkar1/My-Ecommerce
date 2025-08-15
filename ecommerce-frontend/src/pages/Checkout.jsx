import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { useEffect } from "react";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Load Razorpay script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handlePayment = async () => {
    try {
      const { data } = await axios.post("https://YOUR_BACKEND_URL/api/payment/order", {
        amount: total,
      });

      if (!data.id) {
        alert("Payment order creation failed");
        return;
      }

      const options = {
        key: "rzp_test_3hGhouaPibY6QR", // Your Razorpay Key
        amount: data.amount,
        currency: "INR",
        name: "My Shop",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          try {
            await axios.post("https://YOUR_BACKEND_URL/api/payment/verify", {
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
      console.error("Payment initiation failed", err);
      alert("Payment initiation failed. Please check your credentials.");
    }
  };

  if (cart.length === 0) return <p className="mt-24 text-center">🛒 Your cart is empty.</p>;

  return (
    <div className="mt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <p className="mb-4">Total: ₹{total}</p>
      <button
        onClick={handlePayment}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Pay Now
      </button>
    </div>
  );
}
