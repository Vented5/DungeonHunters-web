// src/components/Navbar.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Redirect to the login page
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Dungeon Hunters</h1>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => navigate('/about-us')}>
              About Us
            </button>
          </li>
          <li className="navbar-item">
            <button className="navbar-link" onClick={() => navigate('/dashboard')}>
              Dashboard
            </button>
          </li>
          
          
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;