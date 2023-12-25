import React, { useState } from 'react';
import './a_Login.css';
import { Link } from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';

const AdminLogin = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Error, setError] = useState('');
  const [CapVal, setCapVal] = useState(null);

  const handleLogin = async () => {
    setError('');
    if (!CapVal) {
      setError('Please complete the CAPTCHA.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/admins/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      const data = await response.json();

      console.log('Response from server:', data);

      if (response.status === 200) {
        if (data.token) {
          localStorage.setItem('token', data.token);
          window.location.href = '/adminDash';
        } else {
          setError(data.message || 'Login failed');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="container">
      <Link to="/">
        <button className="back-button">
          <img className="bsck" src="resources/box-arrow-in-left.png" alt="Back Icon" />
        </button>
      </Link>

      <div className="login-box">
        <img className="logo" src="resources/LawaLogo.png" alt="Google Logo" />
        <h2 className="heading">Log in to your account</h2>
        <p className="subheading">Welcome back! Please enter your details.</p>
        {Error && <div className="error-message red">{Error}</div>}
        <div className="form-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter your email"
            className="large-input"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            className="large-input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <ReCAPTCHA sitekey="6LcZrv0oAAAAAO02zhxXuDxjJI2sKfGtjuY07lip" onChange={(val) => setCapVal(val)} />
        <button disabled={!CapVal} className="signin-button" onClick={handleLogin}>
          Sign in
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
