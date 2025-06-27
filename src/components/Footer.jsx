import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <footer>
      <div className="socials">
        <a href="#"><i data-feather="instagram"></i></a>
        <a href="#"><i data-feather="facebook"></i></a>
        <a href="#"><i data-feather="twitter"></i></a>
      </div>
      <div className="credit">
        <p>Created by <a href="#">Novita</a> | &copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
