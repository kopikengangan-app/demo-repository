// src/pages/About.jsx
import React, { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <section id="about" className="about">
      <h2><span>Tentang</span> Kami</h2>

      <div className="row">
        <div className="about-img">
          <img src="/img/novita.jpg" alt="Tentang Kami" />
        </div>
        <div className="content">
            <section className="page-section" id="about"></section>
          <h3>Kopi Kenangan Senja</h3>
          <p>
            Kami adalah rumah kopi yang berdedikasi menyajikan kopi terbaik
            dari seluruh penjuru Nusantara. Mulai dari Aceh hingga Papua,
            kami hadir untuk menghadirkan rasa yang autentik dan berkualitas.
          </p>
          <p>
            Selain menyajikan kopi, kami juga mendukung petani lokal
            dan berkomitmen terhadap keberlanjutan lingkungan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
