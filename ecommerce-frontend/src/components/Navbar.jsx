import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const { wishlist } = useWishlist();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full top-0 z-50 px-6 py-3 flex justify-between items-center transition-all ${scrolled ? 'bg-gray-800 shadow-md py-2' : 'bg-gray-900'}`}>
      <Link to="/" className="text-2xl font-bold">🛒 MyShop</Link>
      <div className="flex items-center gap-4">
        <Link to="/wishlist">❤️ Wishlist ({wishlist.length})</Link>
        <Link to="/cart">🛍 Cart ({cart.length})</Link>

        {user ? (
          <>
            {user.isAdmin && <Link to="/add-product">➕ Add Product</Link>}
            <span>Hello, {user.name}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
