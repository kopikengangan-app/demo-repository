import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';

const productItems = [
  {
    id: 1,
    title: 'Arabica Aceh Gayo',
    harga: 32000,
    hargaSebelum: 50000,
    img: '/img/products1.jpg',
  },
  {
    id: 2,
    title: 'Robusta Lampung',
    harga: 30000,
    hargaSebelum: 45000,
    img: '/img/products2.jpg',
  },
  {
    id: 3,
    title: 'Toraja Kalosi',
    harga: 35000,
    hargaSebelum: 55000,
    img: '/img/products3.jpg',
  },
  {
    id: 4,
    title: 'Java Preanger',
    harga: 34000,
    hargaSebelum: 52000,
    img: '/img/products4.jpg',
  },
  {
    id: 5,
    title: 'Bali Kintamani',
    harga: 36000,
    hargaSebelum: 56000,
    img: '/img/products5.jpg',
  },
  {
    id: 6,
    title: 'Blend Signature',
    harga: 38000,
    hargaSebelum: 58000,
    img: '/img/products6.jpg',
  },
  {
    id: 7,
    title: 'Liberica Riau',
    harga: 33000,
    hargaSebelum: 51000,
    img: '/img/products7.jpg',
  },
  {
    id: 8,
    title: 'Flores Bajawa',
    harga: 37000,
    hargaSebelum: 59000,
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
        {productItems.map((item) => (
          <div className="product-card" key={item.id}>
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
                Rp {item.harga.toLocaleString()} <span>Rp {item.hargaSebelum.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Products;
