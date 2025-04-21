import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Solution from "./components/Solution";
import ContactUs from "./components/ContactUs";
import AboutUs from "./components/AboutUs";
import Dashboard from "./components/Dashboard"; // ✅ Import Dashboard

function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/solutions" element={<Solution />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/dashboard" element={<Dashboard />} /> {/* ✅ Add Dashboard Route */}
      </Routes>
    </Router>
  );
}

export default App;
