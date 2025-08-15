import { useCart } from "../context/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) return <p className="mt-24 text-center">🛒 Your cart is empty.</p>;

  return (
    <div className="mt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.map(item => <CartItem key={item._id} item={item} />)}
      <div className="mt-4 text-right font-semibold text-lg">
        Total: ₹{total}
      </div>
      <div className="mt-4 text-right">
        <Link to="/checkout" className="bg-blue-500 px-4 py-2 rounded text-white hover:bg-blue-600">
          Checkout
        </Link>
      </div>
    </div>
  );
}
