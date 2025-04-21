import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ this is what makes the toggler/menu work!

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
      <div className="container">
        {/* Logo and Brand Name */}
        <Link className="navbar-brand fw-bold text-primary" to="/">
          <img src={logo} alt="ML Detect" width="50" height="50" className="me-2" />
          ML Detect
        </Link>

        {/* Burger Menu Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/solutions">Solutions</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/about">About Us</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
            <li className="nav-item">
              <input type="text" className="form-control me-2 bg-dark text-white" placeholder="Search" />
            </li>
            <li className="nav-item">
              <button className="btn btn-primary" onClick={() => navigate("/login")}>
                {user ? user.firstName : "Login"}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
