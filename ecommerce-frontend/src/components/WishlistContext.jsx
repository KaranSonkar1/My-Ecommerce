import { createContext, useContext, useState } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState([]);

  // ✅ Works with both static data and MongoDB (_id or id)
  const addToWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id || item.id === product.id
      );
      if (!exists) {
        return [...prev, product];
      }
      return prev; // Prevent duplicates
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prev) =>
      prev.filter(
        (item) => item._id !== id && item.id !== id
      )
    );
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
}
