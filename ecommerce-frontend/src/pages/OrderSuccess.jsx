import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-500">✅ Order Placed Successfully!</h1>
      <p className="mt-4">Thank you for shopping with us.</p>
      <Link
        to="/"
        className="bg-green-500 text-white px-4 py-2 rounded mt-4 inline-block"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
