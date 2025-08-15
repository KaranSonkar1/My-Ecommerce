import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/auth/register`, { name, email, password });
      alert("✅ Registered successfully");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "❌ Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required className="border p-2 w-full mb-3"/>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="border p-2 w-full mb-3"/>
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required className="border p-2 w-full mb-3"/>
      <button className="bg-green-500 text-white px-4 py-2 rounded w-full">Register</button>
    </form>
  );
}
