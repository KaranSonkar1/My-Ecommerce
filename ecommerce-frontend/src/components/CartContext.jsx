import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // ✅ Works with both static data and MongoDB (_id or id)
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.some(
        (item) => item._id === product._id || item.id === product.id
      );
      if (!exists) {
        return [...prev, product];
      }
      return prev; // Prevent duplicates
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev.filter(
        (item) => item._id !== id && item.id !== id
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
