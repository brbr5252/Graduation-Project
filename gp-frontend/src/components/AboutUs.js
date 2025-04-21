import React from "react";
import { useNavigate } from "react-router-dom";
import placeholder1 from "../assets/images/About1.png"; // Replace later
import placeholder2 from "../assets/images/About4.png"; // Replace later
import placeholder3 from "../assets/images/About3.png"; // Replace later

export default function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Back Button */}
      <div className="p-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>←</button>
      </div>

      {/* Header Section */}
      <div className="container text-center py-5">
        <h2 className="text-primary">About ML Detect</h2>
        <p className="text-secondary">
          ML Detect is a cutting-edge cybersecurity solution that leverages Machine Learning techniques  
          to detect DDoS attacks in datasets. Using advanced AI-driven analytics,  
          our system identifies malicious traffic patterns and prevents potential threats before they disrupt networks.
        </p>
      </div>

      {/* Image Section */}
      <div className="container text-center py-4">
        <div className="row g-4">
          <div className="col-md-4">
            <img src={placeholder1} alt="ML Detection" className="img-fluid rounded" />
          </div>
          <div className="col-md-4">
            <img src={placeholder2} alt="Cybersecurity" className="img-fluid rounded" />
          </div>
          <div className="col-md-4">
            <img src={placeholder3} alt="Data Analysis" className="img-fluid rounded" />
          </div>
        </div>
      </div>

      {/* Company Mission Section */}
      <div className="container text-center py-5">
        <h3 className="text-primary">Our Mission</h3>
        <p className="text-secondary">
          At ML Detect, our goal is to protect networks from evolving cyber threats.  
          We use deep learning models, anomaly detection algorithms, 
          to provide analysis for the dataset.
        </p>
      </div>
    </div>
  );
}
