import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { Link } from "react-router-dom";

export default function Home() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    axios.get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {products.map((product) => (
        <div key={product._id} className="border p-4 rounded shadow">
          <Link to={`/product/${product._id}`}>
            <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
            <h2 className="text-lg font-bold mt-2">{product.name}</h2>
          </Link>
          <p className="text-gray-600">{product.price} ₹</p>
          <button
            onClick={() => addToCart(product)}
            className="bg-green-500 text-white px-3 py-1 mt-2 rounded"
          >
            Add to Cart
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className="bg-blue-500 text-white px-3 py-1 mt-2 rounded ml-2"
          >
            Wishlist
          </button>
        </div>
      ))}
    </div>
  );
}
