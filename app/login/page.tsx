"use client";
import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import '../styles/logindesign.css';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Navbar from '../components/Navbar';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/users');
      const userData = await response.json();
      const user = userData.find((u: any) => u.username === username && u.password === password);
      if (user) {
        console.log('Login successful. User:', user);

        Cookies.set('user', JSON.stringify(user));
        // Redirect to the homepage
        router.push('/Dashboard');
      } else {
        console.error('Login failed. Invalid credentials.');
        setErrorMessage('Invalid email or password. Please try again.');
        setSuccessMessage('');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };


  return (
    <>
      <Navbar />
    <div className="container mt-5">
        <div className="row justify-content-center align-items-center">
          <div className="col-md-6 border p-4 rounded mx-auto">
            <h1 className="text-center mb-4">Login</h1>
            {successMessage && <p className="text-success">{successMessage}</p>}
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username:
              </label>
              <input
                type="text"
                placeholder='Username'
                className="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)} />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                placeholder='Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)} />
              {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </div>
            <div className="text-center"> {/* Center the login button */}
              <button className="btn btn-primary" onClick={handleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>
            Don't have an account?{' '}
            <Link href="/register" style={{ color: 'red',textDecoration:'none' }}>
              Register
            </Link>
          </p>
        </div>
      </div></>
  );
};

export default Login;
