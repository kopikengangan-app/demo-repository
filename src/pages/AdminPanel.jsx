import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import Swal from 'sweetalert2';

const AdminPanel = () => {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'orders'));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    } catch (error) {
      console.error('Gagal mengambil data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Hapus Pesanan?',
      text: 'Tindakan ini tidak bisa dibatalkan.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Hapus',
      cancelButtonText: 'Batal',
    });

    if (confirm.isConfirmed) {
      await deleteDoc(doc(db, 'orders', id));
      fetchOrders();
      Swal.fire('Dihapus!', 'Pesanan berhasil dihapus.', 'success');
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <section className="admin-panel">
      <h2><span>Panel</span> Admin</h2>
      {orders.length === 0 ? (
        <p>Belum ada pesanan masuk.</p>
      ) : (
        <table className="order-table">
          <thead>
            <tr>
              <th>Nama</th>
              <th>Email</th>
              <th>No HP</th>
              <th>Produk</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.nama}</td>
                <td>{order.email}</td>
                <td>{order.nohp}</td>
                <td>{order.produk || '-'}</td>
                <td>
                  <button className="btn" onClick={() => handleDelete(order.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default AdminPanel;
