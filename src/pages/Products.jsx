// src/pages/Products.jsx
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const productItems = [
  {
    title: 'Arabica Aceh Gayo',
    price: 'IDR 32K',
    priceBefore: 'IDR 50K',
    img: '/img/products1.jpg',
  },
  {
    title: 'Robusta Lampung',
    price: 'IDR 30K',
    priceBefore: 'IDR 45K',
    img: '/img/products2.jpg',
  },
  {
    title: 'Toraja Kalosi',
    price: 'IDR 35K',
    priceBefore: 'IDR 55K',
    img: '/img/products3.jpg',
  },
  {
    title: 'Java Preanger',
    price: 'IDR 34K',
    priceBefore: 'IDR 52K',
    img: '/img/products4.jpg',
  },
  {
    title: 'Bali Kintamani',
    price: 'IDR 36K',
    priceBefore: 'IDR 56K',
    img: '/img/products5.jpg',
  },
  {
    title: 'Blend Signature',
    price: 'IDR 38K',
    priceBefore: 'IDR 58K',
    img: '/img/products6.jpg',
  },
  {
    title: 'Liberica Riau',
    price: 'IDR 33K',
    priceBefore: 'IDR 51K',
    img: '/img/products7.jpg',
  },
  {
    title: 'Flores Bajawa',
    price: 'IDR 37K',
    priceBefore: 'IDR 59K',
    img: '/img/products8.jpg',
  },
];

const Products = () => {
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <section className="products" id="products">
      <h2><span>Produk Unggulan</span> Kami</h2>
      <p>Temukan berbagai jenis kopi Nusantara pilihan terbaik untukmu.</p>

      <div className="row">
        {productItems.map((item, index) => (
          <div className="product-card" key={index}>
            <div className="product-icons">
              <button
                onClick={() => addToCart(item)}
                title="Tambahkan ke Keranjang"
                className="add-cart-btn"
              >
                <i data-feather="shopping-cart"></i>
              </button>
              <button className="item-detail-button" title="Lihat Detail">
                <i data-feather="eye"></i>
              </button>
            </div>
            <div className="product-image">
              <img src={item.img} alt={item.title} />
            </div>
            <div className="product-content">
              <h3>{item.title}</h3>
              <div className="product-stars">
                {[...Array(5)].map((_, i) => (
                  <i
                    key={i}
                    data-feather="star"
                    className={i < 4 ? 'star-full' : ''}
                  ></i>
                ))}
              </div>
              <div className="product-price">
                {item.price} <span>{item.priceBefore}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
