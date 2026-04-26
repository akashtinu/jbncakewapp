import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(null);
CartContext.displayName = "CartContext";

const getInitialCart = () => {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const savedCart = localStorage.getItem("jbn_cart");
    return savedCart ? JSON.parse(savedCart) : [];
  } catch {
    return [];
  }
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getInitialCart);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      localStorage.setItem("jbn_cart", JSON.stringify(cart));
    } catch {
      // Ignore localStorage errors in restricted environments.
    }
  }, [cart]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, weight: item.weight + 250 } : item
        );
      }
      return [...prevCart, { ...product, weight: 500, celebration: '', whoseName: '' }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateWeight = (id, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, weight: Math.max(500, item.weight + delta) } : item
      )
    );
  };

  const updateItemDetails = (id, updates) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === id ? { ...item, ...updates } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + 1, 0); // number of items
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * (item.weight / 500)), 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateWeight, updateItemDetails, clearCart, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};