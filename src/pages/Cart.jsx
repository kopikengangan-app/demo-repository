// src/pages/Cart.jsx
import React, { useContext, useEffect } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      Swal.fire('Keranjang kosong', 'Silakan tambahkan produk terlebih dahulu.', 'warning');
      return;
    }

    Swal.fire({
      title: 'Checkout Berhasil!',
      text: 'Pesanan kamu telah dikirim!',
      icon: 'success',
      confirmButtonText: 'OK',
    });

    clearCart();
  };

  return (
    <section className="shopping-cart cart-page">
      <h2>Keranjang <span>Belanja</span></h2>
      {cartItems.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Keranjang masih kosong.</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <div className="cart-item" key={index}>
              <img src={item.img} alt={item.title} />
              <div>
                <h3>{item.title}</h3>
                <div className="item-price">{item.price}</div>
              </div>
              <button
                className="remove-item"
                onClick={() => removeFromCart(index)}
                title="Hapus dari Keranjang"
              >
                <i data-feather="x"></i>
              </button>
            </div>
          ))}

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button className="btn" onClick={handleCheckout}>
              Checkout Sekarang
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
