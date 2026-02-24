import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(null);

  const addToCart = (service) => {
    setCartItem(service);
  };

  const clearCart = () => {
    setCartItem(null);
  };

  return (
    <CartContext.Provider
      value={{ cartItem, addToCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
