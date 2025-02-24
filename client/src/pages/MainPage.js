import React, { useState } from "react";
import axios from "../api/axios"; // Adjust API setup path if needed
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import "../styles/MainPage.css";

const MainPage = () => {
  const [isRegister, setIsRegister] = useState(false); // Toggle between login and register
  const [formData, setFormData] = useState({ name: "", email: "", password: "" }); // Form data state
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Use navigate for routing

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Registration
        await axios.post("/auth/register", formData);
        alert("Registration successful! Please log in.");
        setIsRegister(false); // Switch to login mode
      } else {
        // Login
        const response = await axios.post("/auth/login", formData);
        const { token } = response.data;

        // Save the token and navigate to home
        localStorage.setItem("token", token);
        navigate("/home"); // Redirect to main app page
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="main-page">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="triangles-layer"></div>
        <div className="glowing-dots-layer"></div>
      </div>

      {/* Content Container */}
      <div className="content-container">
        {/* Welcome Section */}
        <div className="welcome-section">
          <h1>Welcome to EliteTriangle.com</h1>
          <p>
            Your exclusive platform for Springfield College students to connect,
            share, and engage with the community.
          </p>
          {/* Learn More Button */}
          <button
            className="learn-more-button"
            onClick={() => navigate("/learn-more")} // Navigate to Learn More page
          >
            Learn More
          </button>
        </div>

        {/* Login/Registration Section */}
        <div className="form-section">
          <h2>{isRegister ? "Create an Account" : "Login"}</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="form-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name || ""}
                  onChange={handleInputChange}
                  required
                />
              </div>
            )}
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit">{isRegister ? "Register" : "Login"}</button>
          </form>
          <p onClick={() => setIsRegister(!isRegister)} className="toggle-link">
            {isRegister
              ? "Already have an account? Login"
              : "Don't have an account? Register"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
