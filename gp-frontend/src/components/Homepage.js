import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png";
import right from "../assets/images/Test.jpg";


export default function Homepage({ user }) {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black py-3">
        <div className="container">
          <a className="navbar-brand fw-bold text-primary" href="/">
          <img src={logo} alt="ML Detect" width="50" height="50" className="me-2" />
            ML Detect
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item"><a className="nav-link" href="/solutions">Solutions</a></li>
              <li className="nav-item"><a className="nav-link" href="/about">About Us</a></li>
              <li className="nav-item"><a className="nav-link" href="/contact">Contact Us</a></li>
              <li className="nav-item"><input type="text" className="form-control me-2 bg-dark text-white" placeholder="Search" /></li>
              <li className="nav-item">
                <button className="btn btn-primary" onClick={() => navigate("/login")}>
                  {user ? user.firstName : "Login"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container text-center py-5">
        <div className="row align-items-center">
          {/* Left Section */}
          <div className="col-md-6 text-start">
            <h1 className="display-4 fw-bold text-primary">ML Detect</h1>
            <p className="fs-4">Your advanced defense against DDoS attacks</p>
            <p className="text-secondary">In today’s digital world, threats from Distributed Denial of Service (DDoS) attacks are increasing...</p>
            <button className="btn btn-primary btn-lg mt-3" onClick={() => navigate("/signup")}>
              Join us now →
            </button>
          </div>

          {/* Right Section - Logo */}
          <div className="col-md-6 text-center">
            <img src={right} alt="ML Detect Logo" className="img-fluid rounded" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container py-5">
        <h2 className="text-center text-primary">About ML Detect</h2>
        <p className="text-center text-secondary">
          ML Detect is a state-of-the-art cybersecurity solution specializing in Datasets DDoS detection. 
          Our machine-learning-powered system helps businesses protect their networks against malicious traffic and cyber threats.
        </p>
      </div>

      {/* Footer Section */}
      <footer id="contact" className="bg-dark text-white py-4">
        <div className="container text-center">
          <h5>Contact Us</h5>
          <p>Email: support@mldetect.com | Phone: +123-456-7890</p>
          <p>© 2025 ML Detect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
