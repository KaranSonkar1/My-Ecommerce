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
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ Dynamic Navbar */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "bg-gray-800 py-2 shadow-lg"
            : "bg-gray-900 py-3 shadow-md"
        }`}
      >
        <div className="px-6 flex justify-between items-center text-white">
          <Link to="/" className="text-xl font-bold">
            🛒 MyShop
          </Link>

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
        </div>
      </nav>

      {/* ✅ Spacer so content isn't hidden under navbar */}
      <div className={scrolled ? "h-12" : "h-14"}></div>
    </>
  );
}
