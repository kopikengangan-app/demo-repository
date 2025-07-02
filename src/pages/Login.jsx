import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../index.css'; // ✅ naik satu folder ke root


const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = credentials;

    if (email === 'admin@kopi.com' && password === 'kopikenangan') {
      Swal.fire('Berhasil Login!', 'Selamat datang admin.', 'success');
      navigate('/admin');
    } else {
      Swal.fire('Login Gagal', 'Email atau Password salah.', 'error');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2><span>Login</span> Admin</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email admin"
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
