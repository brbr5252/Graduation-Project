import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/Logo.png"; // Ensure correct path

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    agreeToPolicy: false,
    receiveEmails: false, // Optional checkbox
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    try {
      const response = await axios.post("http://localhost:8080/api/customers/signup", formData);
      alert("Signup successful!");
      navigate("/login");
    } catch (error) {
      setError(error.response?.data || "Signup failed!");
    }
  };

  return (
    <div className="bg-black text-white min-vh-100 d-flex align-items-center justify-content-center">
      <div className="container">
        {/* Back Button */}
        <div className="text-start mb-3">
          <button className="btn btn-outline-primary" onClick={() => navigate("/")}>←</button>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-primary">Protect your network from DDoS threats—join us today</h2>
          <p>Take control of your online security.</p>
        </div>

        {/* Signup Form */}
        <div className="card bg-dark p-4 mx-auto text-white" style={{ maxWidth: "500px", borderRadius: "10px" }}>
          <h4 className="text-center">Sign Up</h4>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>

            {/* Name Fields */}
            <div className="row g-3">
              <div className="col-md-6">
                <input 
                  name="firstName" 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary placeholder-light" 
                  placeholder="First name" 
                  onChange={handleChange} 
                  required 
                />
              </div>
              <div className="col-md-6">
                <input 
                  name="lastName" 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary placeholder-light" 
                  placeholder="Last name" 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="mt-3">
              <input 
                name="email" 
                type="email" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Email" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mt-3">
              <input 
                name="phoneNumber" 
                type="tel" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Phone number" 
                onChange={handleChange} 
              />
            </div>

            {/* Password Fields */}
            <div className="mt-3">
              <input 
                name="password" 
                type="password" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Password" 
                onChange={handleChange} 
                required 
              />
            </div>
            <div className="mt-3">
              <input 
                name="confirmPassword" 
                type="password" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Confirm password" 
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Privacy Policy Checkbox */}
            <div className="form-check mt-3">
              <input className="form-check-input" type="checkbox" name="agreeToPolicy" onChange={handleChange} />
              <label className="form-check-label text-white">
                I understand and agree to the <a href="#" className="text-primary">Privacy Policy</a>.
              </label>
            </div>

            {/* Optional Email Subscription Checkbox */}
            <div className="form-check mt-2">
              <input className="form-check-input" type="checkbox" name="receiveEmails" onChange={handleChange} />
              <label className="form-check-label text-white">
                Yes, send me updates about security news.
              </label>
            </div>

            {/* Signup Button */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary w-100" disabled={!formData.agreeToPolicy}>
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
