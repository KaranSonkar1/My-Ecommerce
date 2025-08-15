import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";

export default function Products() {
  const [products, setProducts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios.get(`${API_URL}/api/products`)
      .then(res => setProducts(res.data))
      .catch(err => console.error("Error fetching products", err));
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {products.map(product => <ProductCard key={product._id || product.id} product={product} />)}
      </div>
    </div>
  );
}
