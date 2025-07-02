import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, [cartItems, menuOpen]);

  return (
    <nav className="navbar">
      {/* Logo */}
      <Link to="/" className="navbar-logo">
        Kopi<span>Kenangan</span>
      </Link>

      {/* Hamburger */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        ☰
      </div>

      {/* Menu */}
      <div className={`navbar-nav ${menuOpen ? 'open' : ''}`}>
        <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/menu" onClick={() => setMenuOpen(false)}>Menu</Link>
        <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
        <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
      </div>

      {/* Keranjang */}
      <div className="navbar-extra">
        <Link to="/cart" className="cart-icon">
          <i data-feather="shopping-cart"></i>
          {cartItems.length > 0 && <sup>{cartItems.length}</sup>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
