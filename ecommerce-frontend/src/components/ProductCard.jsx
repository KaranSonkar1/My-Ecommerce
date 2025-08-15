import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-40 object-cover mb-3"
        />
      </Link>
      <h2 className="text-lg font-bold">{product.name}</h2>
      <p className="text-gray-600">{product.price} ₹</p>

      <button
        onClick={() => addToCart(product)}
        className="bg-green-500 text-white px-4 py-2 mt-2 rounded w-full"
      >
        Add to Cart
      </button>
      <button
        onClick={() => addToWishlist(product)}
        className="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full"
      >
        Add to Wishlist
      </button>
    </div>
  );
}
