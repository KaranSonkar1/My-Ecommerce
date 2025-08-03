import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

export default function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (wishlist.length === 0) {
    return <p className="p-6">💖 Your wishlist is empty.</p>;
  }

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {wishlist.map((item) => (
        <div key={item._id} className="border p-4 rounded shadow">
          <img src={item.image} alt={item.name} className="w-full h-48 object-cover" />
          <h2 className="text-lg font-bold mt-2">{item.name}</h2>
          <p className="text-gray-600">{item.price} ₹</p>
          <button
            onClick={() => addToCart(item)}
            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={() => removeFromWishlist(item._id)}
            className="bg-red-500 text-white px-3 py-1 mt-2 rounded ml-2"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
