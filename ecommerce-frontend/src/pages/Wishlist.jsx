import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();

  if (wishlist.length === 0)
    return <p className="mt-24 text-center">💔 Your wishlist is empty.</p>;

  return (
    <div className="mt-24 px-6">
      <h1 className="text-2xl font-bold mb-4">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map(product => (
          <div key={product._id} className="border p-4 rounded shadow hover:shadow-lg relative">
            <Link to={`/product/${product._id}`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover rounded" />
            </Link>
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-700 mt-1">₹{product.price}</p>
            <button
              onClick={() => removeFromWishlist(product._id)}
              className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              Remove ❤️
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
