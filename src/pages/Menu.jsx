// src/pages/Menu.jsx
import React, { useEffect } from 'react';

const menuItems = [
  { title: 'Espresso', price: 'IDR 15K', img: '/img/1.jpg' },
  { title: 'Americano', price: 'IDR 18K', img: '/img/2.jpg' },
  { title: 'Cappuccino', price: 'IDR 20K', img: '/img/3.jpg' },
  { title: 'Latte', price: 'IDR 22K', img: '/img/4.jpg' },
  { title: 'Mocha', price: 'IDR 23K', img: '/img/5.jpg' },
  { title: 'Macchiato', price: 'IDR 19K', img: '/img/6.jpg' },
  { title: 'Affogato', price: 'IDR 25K', img: '/img/7.jpg' },
  { title: 'Flat White', price: 'IDR 21K', img: '/img/8.jpg' },
  { title: 'Cold Brew', price: 'IDR 24K', img: '/img/9.jpg' },
  { title: 'Nitro Coffee', price: 'IDR 26K', img: '/img/10.jpg' },
];

const Menu = () => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <section id="menu" className="menu">
      <h2><span>Menu</span> Kami</h2>
      <p>
        Nikmati sajian kopi spesial dengan kualitas terbaik dari kami.
      </p>

      <div className="row">
        {menuItems.map((item, index) => (
          <div className="menu-card" key={index}>
            <img src={item.img} alt={item.title} className="menu-card-img" />
            <h3 className="menu-card-title">- {item.title} -</h3>
            <p className="menu-card-price">{item.price}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu;
