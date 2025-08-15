import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isWishlisted = wishlist.some(p => p._id === product._id);

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition relative">
      <Link to={`/product/${product._id}`}>
        <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
      </Link>
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-gray-700 mt-1">₹{product.price}</p>

      <div className="flex gap-2 mt-2">
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Add to Cart
        </button>
        <button
          onClick={() => isWishlisted ? removeFromWishlist(product._id) : addToWishlist(product)}
          className={`px-3 py-1 rounded ${isWishlisted ? 'bg-red-500 hover:bg-red-600' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {isWishlisted ? 'Remove ❤️' : 'Wishlist ❤️'}
        </button>
      </div>
    </div>
  );
}
