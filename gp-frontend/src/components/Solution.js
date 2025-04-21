import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Solution3.png"; // Example image
import logImage from "../assets/images/Solution2.png"; 
import alertImage from "../assets/images/Solution5.png"; 

export default function Solution() {
  const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-vh-100">
      {/* Back Button */}
      <div className="p-3">
        <button className="btn btn-outline-primary" onClick={() => navigate("/")}>←</button>
      </div>

      {/* Header */}
      <h2 className="text-center text-primary mb-4">Explore Our Advanced DDoS Detection Suite</h2>

      {/* Solution Cards */}
      <div className="container">
        <div className="row g-4">
          
          {/* Card 1: Advanced DDoS Detection */}
          <div className="col-md-4">
            <div className="card bg-black text-white p-3">
              <img src={logo} alt="Advanced DDoS Detection" className="img-fluid rounded" />
              <h5 className="mt-3">Advanced DDoS Detection</h5>
              <p>Monitor your network traffic with advanced machine learning algorithms that identify DDoS attacks in datasets.</p>
              <button className="btn btn-primary" onClick={() => navigate("/dashboard")}>Get Started</button> {/* ✅ Navigates to Dashboard */}
            </div>
          </div>

          {/* Other Cards */}
          <div className="col-md-4">
            <div className="card bg-black text-white p-3">
              <img src={logImage} alt="Result & Finding" className="img-fluid rounded" />
              <h5 className="mt-3">Result & Finding</h5>
              <p>Sharing key results and findings in our graduation project that was vital to implement our machine learning algorithms.</p>
              <button className="btn btn-primary">Learn More</button>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card bg-black text-white p-3">
              <img src={alertImage} alt="Contributers" className="img-fluid rounded" />
              <h5 className="mt-3">Contributers</h5>
              <p>extending our heartfelt gratitude to our supervisors and evaluators whom aided us in our journey in the graduation project.</p>
              <button className="btn btn-primary">Find Out More</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
