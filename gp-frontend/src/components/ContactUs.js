import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ContactUs() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage("Message sent successfully!");
    setFormData({ firstName: "", lastName: "", email: "", message: "" }); // Clear inputs
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
          <h2 className="text-primary">Contact Us</h2>
          <p>We'd love to hear from you. Send us a message!</p>
        </div>

        {/* Contact Form */}
        <div className="card bg-dark p-4 mx-auto text-white" style={{ maxWidth: "500px", borderRadius: "10px" }}>
          <h4 className="text-center">Get in Touch</h4>
          {successMessage && <p className="text-success text-center">{successMessage}</p>}
          <form onSubmit={handleSubmit}>

            {/* Name Fields */}
            <div className="row g-3">
              <div className="col-md-6">
                <input 
                  name="firstName" 
                  type="text" 
                  className="form-control bg-dark text-white border-secondary placeholder-light" 
                  placeholder="First name" 
                  value={formData.firstName}
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
                  value={formData.lastName}
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mt-3">
              <input 
                name="email" 
                type="email" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Email" 
                value={formData.email}
                onChange={handleChange} 
                required 
              />
            </div>

            {/* Message Field */}
            <div className="mt-3">
              <textarea 
                name="message" 
                rows="4" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Your message..." 
                value={formData.message}
                onChange={handleChange} 
                required
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="mt-3">
              <button type="submit" className="btn btn-primary w-100">
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
