import React from "react";
import { useNavigate } from "react-router-dom";
import right from "../assets/images/Test.jpg";
import Header from "./Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // ✅ this is what makes the toggler/menu work!


const Homepage = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Navbar */}
      <Header user={user} />

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

            <a href="GP Final Report.pdf" download>
            <button className="btn btn-primary btn-lg mt-3 ms-5">
              Download Research
            </button>
            </a>
          </div>

          {/* Right Section */}
          <div className="col-md-6 text-center">
            <img src={right} alt="ML Detect Logo" className="img-fluid rounded" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="container py-5">
        <h2 className="text-center text-primary">About ML Detect</h2>
        <p className="text-center text-secondary">
          ML Detect is a state-of-the-art cybersecurity solution specializing in DDoS detection. 
          Our machine-learning-powered system helps businesses protect their networks against malicious traffic and cyber threats.
        </p>
      </div>

      {/* Footer */}
      <footer id="contact" className="bg-dark text-white py-4">
        <div className="container text-center">
          <h5>Contact Us</h5>
          <p>Email: support@mldetect.com | Phone: +123-456-7890</p>
          <p>© 2025 ML Detect. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;
