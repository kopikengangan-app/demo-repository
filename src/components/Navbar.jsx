// src/components/Navbar.jsx
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { cartItems } = useContext(CartContext);

  useEffect(() => {
    if (window.feather) window.feather.replace();
  }, [cartItems]);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">Kopi<span>Kenangan</span></Link>
      <div className="navbar-nav">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/products">Products</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-extra">
        <Link to="/cart">
          <i data-feather="shopping-cart"></i>
          {cartItems.length > 0 && <sup>{cartItems.length}</sup>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
