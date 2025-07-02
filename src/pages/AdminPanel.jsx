// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase/firebaseConfig';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  where,
} from 'firebase/firestore';
import { signOut } from 'firebase/auth';
import Swal from 'sweetalert2';
import Dashboard from '../components/Dashboard'; // komponen grafik + export Excel
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  // State data pesanan
  const [orders, setOrders] = useState([]);
  // Filter pencarian nama
  const [searchName, setSearchName] = useState('');
  // Filter tanggal mulai dan selesai (string yyyy-mm-dd)
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Ambil data pesanan realtime dari Firestore
  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(data);
    });

    return () => unsubscribe();
  }, []);

  // Logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        Swal.fire('Error', error.message, 'error');
      });
  };

  // Update status pesanan di Firestore
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      Swal.fire('Berhasil', 'Status pesanan diupdate.', 'success');
    } catch (error) {
      Swal.fire('Error', 'Gagal update status.', 'error');
    }
  };

  // Filter orders berdasarkan pencarian dan tanggal
  const filteredOrders = orders.filter((order) => {
    const nameMatch = order.nama.toLowerCase().includes(searchName.toLowerCase());
    const orderDate = order.createdAt?.toDate
      ? order.createdAt.toDate()
      : new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    const dateMatch =
      (!start || orderDate >= start) && (!end || orderDate <= end);

    return nameMatch && dateMatch;
  });

  // Pagination
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  const handlePageChange = (pageNum) => {
    if (pageNum < 1 || pageNum > totalPages) return;
    setCurrentPage(pageNum);
  };

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h2>
          <span>Panel</span> Admin
        </h2>
        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>

      {/* Dashboard Ringkasan */}
      <Dashboard orders={orders} />

      {/* Filter */}
      <div className="filter-container">
        <input
          type="text"
          placeholder="Cari nama pemesan..."
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="date"
          placeholder="Tanggal mulai"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          placeholder="Tanggal selesai"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      {/* Tabel Pesanan */}
      {filteredOrders.length === 0 ? (
        <p>Belum ada pesanan sesuai filter.</p>
      ) : (
        <>
          <table className="order-table">
            <thead>
              <tr>
                <th>Nama</th>
                <th>Email</th>
                <th>No HP</th>
                <th>Produk</th>
                <th>Total (Rp)</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.nama}</td>
                  <td>{order.email}</td>
                  <td>{order.nohp}</td>
                  <td>{order.produk}</td>
                  <td>{order.total?.toLocaleString() || '-'}</td>
                  <td>
                    <select
                      value={order.status || 'Belum Diproses'}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    >
                      <option>Belum Diproses</option>
                      <option>Diproses</option>
                      <option>Selesai</option>
                    </select>
                  </td>
                  <td>
                    {order.createdAt?.toDate
                      ? order.createdAt.toDate().toLocaleString()
                      : new Date(order.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Sebelumnya
            </button>
            <span>
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Selanjutnya
            </button>
          </div>
        </>
      )}
    </section>
  );
};

export default AdminPanel;
