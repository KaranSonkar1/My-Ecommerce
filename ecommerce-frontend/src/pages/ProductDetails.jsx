import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const isWishlisted = product && wishlist.some(p => p._id === product._id);

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`https://YOUR_BACKEND_URL/api/products/${id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [id]);

  if (!product) return <p className="mt-24 text-center">Loading...</p>;

  return (
    <div className="mt-24 px-6 flex gap-6">
      <img src={product.image} alt={product.name} className="w-96 h-96 object-cover rounded" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="text-gray-700 mt-2">₹{product.price}</p>
        <p className="mt-4">{product.description}</p>

        <div className="flex gap-2 mt-4">
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 px-3 py-1 text-white rounded hover:bg-green-600"
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
    </div>
  );
}
