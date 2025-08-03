import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { addToWishlist } = useWishlist();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products/${id}`)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error("Error fetching product", err));
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 flex flex-col md:flex-row gap-6">
      <img src={product.image} alt={product.name} className="w-96 h-96 object-cover" />
      <div>
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="text-lg mt-2">{product.description}</p>
        <p className="text-2xl mt-4 font-bold">{product.price} ₹</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-green-500 text-white px-4 py-2 mt-4 rounded"
        >
          Add to Cart
        </button>
        <button
          onClick={() => addToWishlist(product)}
          className="bg-blue-500 text-white px-4 py-2 mt-2 rounded ml-2"
        >
          Add to Wishlist
        </button>
      </div>
    </div>
  );
}
