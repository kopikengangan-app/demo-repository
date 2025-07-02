// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const Dashboard = ({ orders }) => {
  const [dailySummary, setDailySummary] = useState({
    totalOrders: 0,
    totalIncome: 0,
    bestSeller: '',
  });

  // Hitung ringkasan data
  useEffect(() => {
    if (!orders || orders.length === 0) {
      setDailySummary({ totalOrders: 0, totalIncome: 0, bestSeller: '-' });
      return;
    }

    const today = new Date().toISOString().slice(0, 10); // yyyy-mm-dd
    const todayOrders = orders.filter(order => order.createdAt?.toDate
      ? order.createdAt.toDate().toISOString().slice(0, 10) === today
      : order.createdAt?.toISOString().slice(0, 10) === today);

    const totalOrders = todayOrders.length;
    const totalIncome = todayOrders.reduce((sum, order) => sum + (order.total || 0), 0);

    // Hitung kopi terlaris
    const productCount = {};
    todayOrders.forEach(order => {
      if (order.produk) {
        const lines = order.produk.split('\n');
        lines.forEach(line => {
          const match = line.match(/\.\s(.+)\s-\sRp/);
          if (match && match[1]) {
            productCount[match[1]] = (productCount[match[1]] || 0) + 1;
          }
        });
      }
    });
    const bestSeller = Object.entries(productCount).sort((a,b) => b[1] - a[1])[0]?.[0] || '-';

    setDailySummary({ totalOrders, totalIncome, bestSeller });
  }, [orders]);

  // Data untuk grafik: total pesanan per hari (7 hari terakhir)
  const getChartData = () => {
    if (!orders) return [];

    const days = [];
    for(let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      days.push(d.toISOString().slice(0,10));
    }

    return days.map(day => {
      const count = orders.filter(order => order.createdAt?.toDate
        ? order.createdAt.toDate().toISOString().slice(0,10) === day
        : order.createdAt?.toISOString().slice(0,10) === day
      ).length;
      return { date: day, orders: count };
    });
  };

  const exportToExcel = () => {
    if (!orders || orders.length === 0) {
      alert('Tidak ada data untuk diexport');
      return;
    }

    const dataForExcel = orders.map(order => ({
      Nama: order.nama,
      Email: order.email,
      NoHP: order.nohp,
      Produk: order.produk,
      Total: order.total,
      Tanggal: order.createdAt?.toDate ? order.createdAt.toDate().toLocaleString() : order.createdAt?.toLocaleString(),
    }));

    const ws = XLSX.utils.json_to_sheet(dataForExcel);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pesanan');

    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([wbout], { type: 'application/octet-stream' });

    saveAs(blob, `pesanan_${new Date().toISOString().slice(0,10)}.xlsx`);
  };

  return (
    <section className="dashboard">
      <h2 style={{ textAlign: 'center' }}>Dashboard Ringkasan</h2>
      <div className="order-filter-container">
  <form className="order-filter">
    <input type="text" placeholder="Cari nama pemesan..." />
    <input type="date" />
    <input type="date" />
    <button type="submit" className="btn-filter"></button>
  </form>
</div>


      <div className="summary-cards">
        <div className="card">
          <h3>Total Pesanan Hari Ini</h3>
          <p>{dailySummary.totalOrders}</p>
        </div>
        <div className="card">
          <h3>Total Pemasukan Hari Ini</h3>
          <p>Rp {dailySummary.totalIncome.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Kopi Terlaris Hari Ini</h3>
          <p>{dailySummary.bestSeller}</p>
        </div>
      </div>

      <h3 style={{ textAlign: 'center', marginTop: '2rem' }}>Grafik Pesanan 7 Hari Terakhir</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={getChartData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="orders" fill="#8884d8" name="Jumlah Pesanan" />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <button onClick={exportToExcel} className="btn-export">
          Export Data ke Excel
        </button>
      </div>

      <div style={{ textAlign: 'right', marginTop: '2rem' }}>
        <form action="/logout" method="POST">
          <button className="logout-button">Logout</button>
        </form>
      </div>
    </section>
  );
};

export default Dashboard;
