import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import Swal from 'sweetalert2';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import '../index.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const [nama, setNama] = useState('');
  const [email, setEmail] = useState('');
  const [nohp, setNohp] = useState('');

  const handleRemove = (index) => {
    Swal.fire({
      title: 'Hapus Produk?',
      text: 'Produk akan dihapus dari keranjang.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(index);
        Swal.fire('Dihapus!', 'Produk telah dihapus.', 'success');
      }
    });
  };

  const handleCheckout = async () => {
    console.log('Checkout dipanggil');
    console.log('Nama:', nama);
    console.log('Email:', email);
    console.log('No HP:', nohp);
    console.log('Cart Items:', cartItems);

    if (cartItems.length === 0 || !nama || !email || !nohp) {
      return Swal.fire('Gagal', 'Semua data harus diisi dan keranjang tidak boleh kosong.', 'error');
    }

    const pesanText = cartItems.map(
      (item, index) =>
        `${index + 1}. ${item.title} x${item.quantity} - Rp ${(item.harga * item.quantity).toLocaleString()}`
    ).join('\n');

    const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);

    const message = `
*Pesanan Kopi Kenangan*
Nama: ${nama}
Email: ${email}
No HP: ${nohp}

Produk:
${pesanText}

Total: Rp ${totalHarga.toLocaleString()}
    `.trim();

    try {
      await addDoc(collection(db, 'orders'), {
        nama,
        email,
        nohp,
        produk: pesanText,
        total: totalHarga,
        createdAt: new Date(),
      });

      const encodedMessage = encodeURIComponent(message);
      const whatsappLink = `https://wa.me/6282247169749?text=${encodedMessage}`;
      window.open(whatsappLink, '_blank');

      Swal.fire({
        title: 'Terima Kasih!',
        text: 'Pesanan kamu berhasil dikirim. Terima kasih telah belanja di toko kami!',
        icon: 'success',
      });

      setNama('');
      setEmail('');
      setNohp('');
      clearCart();
    } catch (error) {
      console.error(error);
      Swal.fire('Error', 'Gagal mengirim pesanan.', 'error');
    }
  };

  const totalHarga = cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);

  return (
    <section className="cart-page">
      <h2 className="cart-title"><span>Keranjang</span> Belanja</h2>

      {cartItems.length === 0 ? (
        <p className="cart-empty">Keranjang kamu masih kosong.</p>
      ) : (
        <>
          <div className="cart-grid">
            {cartItems.map((item, index) => (
              <div key={index} className="cart-item">
                <img src={item.img} alt={item.title} className="cart-img" />
                <div className="cart-info">
                  <h4>{item.title}</h4>
                  <p>Rp {item.harga.toLocaleString()}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
                  </div>
                  <button className="btn-remove" onClick={() => handleRemove(index)}>Hapus</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total">
            <h3>Total: Rp {totalHarga.toLocaleString()}</h3>
          </div>

          <div className="checkout-form">
            <input
              type="text"
              placeholder="Nama Lengkap"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              onInput={(e) => setNama(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Nomor HP (08...)"
              value={nohp}
              onChange={(e) => setNohp(e.target.value)}
              onInput={(e) => setNohp(e.target.value)}
              required
            />
            <button type="button" className="btn-checkout" onClick={handleCheckout}>
              Checkout Sekarang
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
