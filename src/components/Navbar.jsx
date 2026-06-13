import { useState, useEffect } from "react";
import logo from "../assets/jbn-BmhTlDdF.png";

export default function Navbar({ cartCount, onCartClick }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__brand">
        <img src={logo} alt="Sweetly Yours Logo" className="navbar__logo" />
        
        <span className="navbar__name">JBN Cakes</span>
      </div>
      <button className="navbar__cart" onClick={onCartClick} aria-label="Open cart">
        <span className="navbar__cart-icon">🛒</span>
        <span className="navbar__cart-label">Cart</span>
        {cartCount > 0 && (
          <span className="navbar__badge">{cartCount}</span>
        )}
      </button>
    </nav>
  );
}
