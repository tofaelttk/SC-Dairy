import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = ({ isLoggedIn }) => {
  const [activeTab, setActiveTab] = useState(""); // Tracks the active tab
  const navigate = useNavigate();

  const handleTabClick = (tab) => {
    setActiveTab((prevTab) => (prevTab === tab ? "" : tab)); // Toggle tab
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      name: e.target.name.value,
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("http://localhost:5001/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message); // Success message
        setActiveTab(""); // Close the tab
      } else {
        alert(result.error); // Error message
      }
    } catch (error) {
      console.error("Failed to send the message:", error);
      alert("Failed to send the message. Please try again.");
    }
  };

  return (
    <>
      <div className="navbar-container">
        {/* Animated Background */}
        <div className="animated-background">
          <div className="triangles-layer"></div>
          <div className="glowing-dots-layer"></div>
        </div>

        {/* Navbar Content */}
        <div className="navbar">
          <div className="navbar-logo" onClick={() => navigate("/")}>
            EliteTriangle.com
          </div>
          <div className="navbar-links">
            {!isLoggedIn ? (
              <>
                <button
                  className="navbar-link"
                  onClick={() => handleTabClick("about")}
                >
                  About Us
                </button>
                <button
                  className="navbar-link"
                  onClick={() => handleTabClick("contact")}
                >
                  Contact Us
                </button>
              </>
            ) : (
              <>
                <Link to="/feed" className="navbar-link">
                  Feed
                </Link>
                <Link to="/profile" className="navbar-link">
                  Profile
                </Link>
                <Link to="/events" className="navbar-link">
                  Events
                </Link>
                <Link to="/messages" className="navbar-link">
                  Messages
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {activeTab && (
        <div
          className="overlay"
          onClick={() => setActiveTab("")} // Close only when clicking the overlay
        ></div>
      )}

      {/* About Us Panel */}
      {activeTab === "about" && (
        <div
          className="side-panel"
          onClick={(e) => {
            e.stopPropagation(); // Prevent overlay clicks from triggering
          }}
        >
          <h2>About Us</h2>
          <p>
            EliteTriangle.com is your exclusive premium social platform for you. Connect with peers, share your moments, and
            discover college events in a single platform.
          </p>
          <button
            className="close-panel-btn"
            onClick={() => setActiveTab("")}
          >
            Close
          </button>
        </div>
      )}

      {/* Contact Us Panel */}
      {activeTab === "contact" && (
        <div
          className="side-panel"
          onClick={(e) => {
            e.stopPropagation(); // Prevent overlay clicks from triggering
          }}
        >
          <h2>Contact Us</h2>
          <form onSubmit={handleContactSubmit} className="contact-form">
            <div className="form-group">
              <label>Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                required
              />
            </div>
            <div className="form-group">
              <label>Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="form-group">
              <label>Subject</label>
              <select name="subject" required>
                <option value="Login Issue">Login Issue</option>
                <option value="Registration Issue">Registration Issue</option>
                <option value="Reports">Reports</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea
                name="message"
                rows="4"
                placeholder="Write your message here..."
                required
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
          <button
            className="close-panel-btn"
            onClick={() => setActiveTab("")}
          >
            Close
          </button>
        </div>
      )}
    </>
  );
};

export default Navbar;
