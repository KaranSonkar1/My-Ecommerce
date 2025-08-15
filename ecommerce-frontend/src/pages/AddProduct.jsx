import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export default function AddProduct() {
  const { token, user } = useAuth();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  if (!user?.isAdmin) {
    return <p className="p-6 text-red-500">Access Denied: Admins only</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_URL}/api/products`,
        { name, description, price, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Product created successfully!");
      setName(""); setDescription(""); setPrice(""); setImage("");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Failed to create product");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">➕ Add New Product</h1>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 w-full mb-3"
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 w-full mb-3"
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-2 w-full mb-3"
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        required
        className="border p-2 w-full mb-3"
      />
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full">
        Add Product
      </button>
    </form>
  );
}
