// src/pages/Home.jsx
import React, { useEffect } from 'react';

const Home = () => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <section className="hero" id="home">
      <div className="mask-container">
        <main className="content">
            <section className="page-section" id="home"></section>
          <h1>
            Mari Nikmati Secangkir <span>Kopi</span>
          </h1>
          <p>
            Rasakan kehangatan dan cita rasa kopi terbaik dari Nusantara,
            disajikan dengan sepenuh hati.
          </p>
        </main>
      </div>
    </section>
  );
};

export default Home;
