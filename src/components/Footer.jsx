import React, { useEffect } from 'react';
import feather from 'feather-icons';

const Footer = () => {
  useEffect(() => {
    feather.replace(); // <- ini yang penting
  }, []);

  return (
    <footer>
      <div className="sosmed">
        <a
          href="https://www.instagram.com/usernamekamu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i data-feather="instagram"></i>
        </a>
        <a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i data-feather="message-circle"></i>
        </a>
        <a
          href="https://www.facebook.com/usernamekamu"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i data-feather="facebook"></i>
        </a>
      </div>
      <div className="credit" style={{ marginTop: '50 px', textAlign: 'center', color: '#777' }}>
        <p>Created by <strong>Novita</strong> | &copy; 2025</p>
      </div>
    </footer>
  );
};

export default Footer;
