import React, { useState, useEffect } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nohp: '',
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data dikirim:', formData);
    alert('Pesan berhasil dikirim!');
    setFormData({ nama: '', email: '', nohp: '' }); // reset
  };

  useEffect(() => {
    if (window.feather) {
      window.feather.replace();
    }
  }, []);

  return (
    <section id="contact" className="contact">
      <h2><span>Kontak</span> Kami</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, provident.</p>

      <div className="row">
        <iframe
         src="https://www.google.com/maps/embed?pb=!1m19!1m12!1m3!1d1212889.0403081318!2d98.57264156492553!3d3.084201722331532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m4!3e6!4m0!4m1!2sJalan%20TB%20simatupang%20komplek%20pinang%20baris%2C%20Sunggal%2C%20Kec.%20Medan%20Sunggal%2C%20Kota%20Medan%2C%20Sumatera%20Utara%2020127%2C%20Indonesia!5e0!3m2!1sid!2sid!4v1751013550312!5m2!1sid!2sid" 
          width="600"
          height="750"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="map"
          title="lokasi"
        ></iframe>

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <i data-feather="user"></i>
            <input 
              type="text" 
              name="nama" 
              placeholder="nama" 
              value={formData.nama} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <i data-feather="mail"></i>
            <input 
              type="email" 
              name="email" 
              placeholder="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
            />
          </div>
          <div className="input-group">
            <i data-feather="phone"></i>
            <input 
              type="text" 
              name="nohp" 
              placeholder="no hp" 
              value={formData.nohp} 
              onChange={handleChange} 
              required 
            />
          </div>
          <button type="submit" className="btn">kirim pesan</button>
          <section className="page-section" id="contact"></section>

        </form>
      </div>
    </section>
  );
};

export default Contact;