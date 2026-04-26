import React, { useState } from "react";
import Navbar from "./Navbar";
import Home from "./home";
import Products from "./Products";
import About from "./about";
import Footer from "./Footer";
import CartPage from "./CartPage";
import { CartProvider } from "./CartContext";

function App() {
  const [cartOpen, setCartOpen] = useState(false);

  const handleNavClick = () => {
    if (cartOpen) {
      setCartOpen(false);
    }
  };

  return (
    <CartProvider>
      <Navbar onCartClick={() => setCartOpen(true)} onNavClick={handleNavClick} />
      {cartOpen ? (
        <CartPage onClose={() => setCartOpen(false)} />
      ) : (
        <>
          <Home />
          <Products />
          <About />
        </>
      )}
      <Footer />
    </CartProvider>
  );
}

export default App;
