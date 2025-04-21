import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login({ setUser }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/api/customers/login", formData);
      setUser(response.data); // Store user data
      navigate("/"); // Redirect to homepage
    } catch (error) {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="bg-dark text-white d-flex align-items-center justify-content-center vh-100">
      <div className="container">
        <div className="text-center">
          <button className="btn btn-outline-primary mb-3" onClick={() => navigate("/")}>← Back</button>
          <h2 className="text-primary">Welcome back! Secure your network</h2>
        </div>
        <div className="card bg-black p-4 mx-auto text-white" style={{ maxWidth: "500px" }}>
          <h4 className="text-center">Login to your account</h4>
          {error && <p className="text-danger text-center">{error}</p>}
          <form onSubmit={handleSubmit}>
          <input 
                name="email" 
                type="email" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Email" 
                onChange={handleChange} 
                required 
              />
            <input 
                name="password" 
                type="password" 
                className="form-control bg-dark text-white border-secondary placeholder-light" 
                placeholder="Password" 
                onChange={handleChange} 
                required 
              />            <button type="submit" className="btn btn-primary w-100 mt-3">Login</button>
          </form>
          <div className="text-center mt-2">
            <small>New to ML Detect? <a href="/signup" className="text-primary">Sign up</a></small>
          </div>
        </div>
      </div>
    </div>
  );
}
