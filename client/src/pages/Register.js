import React, { useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/register", formData);
      console.log("Registration successful:", response.data);
      alert("Registration successful! Redirecting to profile picture upload.");
      navigate("/upload-profile-picture"); // Redirect to upload profile picture page
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    }
  };
  
  

  return (
    <div className="auth-container">
      <h2>Register</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/">Login here</a>
      </p>
    </div>
  );
};

export default Register;
