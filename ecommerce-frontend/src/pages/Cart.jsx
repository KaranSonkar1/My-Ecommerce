import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return <p className="p-6">🛒 Your cart is empty.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map((item) => (
        <div key={item._id} className="flex items-center justify-between border-b py-2">
          <span>{item.name}</span>
          <span>{item.price} ₹</span>
          <button
            onClick={() => removeFromCart(item._id)}
            className="text-red-500"
          >
            Remove
          </button>
        </div>
      ))}
      <p className="mt-4 font-bold">Total: {total} ₹</p>
      <Link
        to="/checkout"
        className="bg-green-500 text-white px-4 py-2 mt-4 inline-block rounded"
      >
        Proceed to Checkout
      </Link>
    </div>
  );
}
