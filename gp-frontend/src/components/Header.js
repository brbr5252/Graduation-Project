import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png"; // Ensure the correct path
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap if not already included

const Header = ({ user }) => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
      <div className="container">
        {/* ✅ Logo & Brand Name */}
        <a className="navbar-brand fw-bold text-primary" href="/">
          <img src={logo} alt="ML Detect" width="50" height="50" className="me-2" />
          ML Detect
        </a>

        {/* ✅ Navbar Toggler (Mobile) */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navbar Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><a className="nav-link" href="/solutions">Solutions</a></li>
            <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
            <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>

            {/* ✅ Search Box */}
            <li className="nav-item">
              <input type="text" className="form-control me-2 bg-dark text-white" placeholder="Search" />
            </li>

            {/* ✅ Login Button (Shows Username if Logged In) */}
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
