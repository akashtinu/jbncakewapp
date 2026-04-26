import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faXmark, faCartShopping, faTrash } from "@fortawesome/free-solid-svg-icons";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import logo from "./assets/jbn.png";
import "./Navbar.css";
import { useCart } from "./CartContext";

function Navbar({ onCartClick, onNavClick }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`navbar navbar-expand-lg fixed-top pink-navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">

          <a className="navbar-brand" href="#">
            <img src={logo} alt="JBN Cakes" className="navbar-logo" />
          </a>

          <button
            className="navbar-toggler"
            onClick={() => setOpen(!open)}
          >
            <FontAwesomeIcon icon={open ? faXmark : faBars} />
          </button>

          <div className={`navbar-collapse ${open ? "open" : ""}`}>
            <ul className="navbar-nav ms-auto text-center">
              {["Home", "Cakes", "Brownies", "About"].map((item) => (
                <li className="nav-item" key={item}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className="nav-link"
                    onClick={() => { onNavClick(); setOpen(false); }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div
            className="cart-icon-container"
            role="button"
            aria-label="Open cart"
            style={{ cursor: 'pointer', position: 'relative', marginLeft: '20px' }}
            onClick={onCartClick}
          >
            <FontAwesomeIcon icon={faCartShopping} className="cart-icon" size="lg" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Floating Instagram */}
      <a
        href="https://www.instagram.com/jbnca_kes/"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-instagram"
      >
        {/* <FontAwesomeIcon icon={faInstagram}   className="floating-instagram-icon " /> */}
        <FontAwesomeIcon icon={faInstagram} bounce className="floating-instagram-icon" />
      </a>
    </>
  );
}

export default Navbar;
