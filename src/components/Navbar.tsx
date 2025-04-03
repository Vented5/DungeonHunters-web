// src/components/Navbar.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Navbar.css";
import navlogo from "../assets/images/navlogo.png";

const Navbar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo-container" onClick={() => navigate("/")}>
          <img src={navlogo} alt="Logo de la App" className="navbar-logo" />
        </div>
        <ul className="navbar-menu">
          <li className="navbar-item">
            <button
              className="navbar-link"
              onClick={() => navigate("/about-us")}
            >
              About Us
            </button>
          </li>
          <li className="navbar-item">
            <button
              className="navbar-link"
              onClick={() => navigate("/dashboard")}
            >
              Dashboard
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
