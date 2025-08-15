import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="mt-24 px-6 text-center">
      <h1 className="text-3xl font-bold text-green-600">✅ Payment Successful!</h1>
      <p className="mt-4">Thank you for your purchase. Your order has been placed successfully.</p>
      <Link to="/" className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Continue Shopping
      </Link>
    </div>
  );
}
