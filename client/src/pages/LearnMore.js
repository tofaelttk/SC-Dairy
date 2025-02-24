import React, { useEffect, useState, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { TypeAnimation } from "react-type-animation";
import "../styles/LearnMore.css";
import { useNavigate } from "react-router-dom";

const LearnMore = () => {
  const [showPopup, setShowPopup] = useState(false); // State for Explore Features popup
  const [activeReview, setActiveReview] = useState(0); // State for active review
  const [isJoinHovered, setIsJoinHovered] = useState(false);
  const stayConnectedRef = useRef(null); // Reference to Stay Connected section
  const navigate = useNavigate();

  const team = [
    {
      name: "Alice Johnson",
      role: "Senior Developer",
      photo: "/images/alice-johnson.jpg",
      description:
        "Alice specializes in front-end development and has created stunning interfaces for top-tier platforms.",
    },
    {
      name: "Bob Williams",
      role: "Back-End Engineer",
      photo: "/images/bob-williams.jpg",
      description:
        "Bob ensures the seamless functionality of our platform, handling server-side development with expertise.",
    },
    {
      name: "Carla Martinez",
      role: "UI/UX Designer",
      photo: "/images/carla-martinez.jpg",
      description:
        "Carla brings her creative touch to ensure the user experience is both functional and delightful.",
    },
    {
      name: "Daniel Lee",
      role: "Full-Stack Developer",
      photo: "/images/daniel-lee.jpg",
      description:
        "Daniel's skills span across front-end and back-end, making him an invaluable team member.",
    },
    {
      name: "Eva Thompson",
      role: "QA Engineer",
      photo: "/images/eva-thompson.jpg",
      description:
        "Eva rigorously tests the platform to ensure a bug-free and smooth experience for all users.",
    },
  ];

  const reviews = [
    {
      name: "Sophia Bennett",
      photo: "/images/sophia-bennett.jpg",
      comment:
        "EliteTriangle has made connecting with peers so effortless and enjoyable. The platform is sleek and modern!",
    },
    {
      name: "Liam Carter",
      photo: "/images/liam-carter.jpg",
      comment:
        "The event section is my favorite! I’ve never missed a Springfield College event since I joined.",
    },
    {
      name: "Emma Brown",
      photo: "/images/emma-brown.jpg",
      comment:
        "I love the simplicity and style of EliteTriangle. It’s everything a college student needs in one place.",
    },
    {
      name: "Noah Wilson",
      photo: "/images/noah-wilson.jpg",
      comment:
        "The feed is amazing! Sharing my moments and seeing others’ is so seamless and fun.",
    },
    {
      name: "Olivia Davis",
      photo: "/images/olivia-davis.jpg",
      comment:
        "The platform feels like it was designed just for me. Love the personalized experience!",
    },
    {
      name: "James Miller",
      photo: "/images/james-miller.jpg",
      comment:
        "From messaging to events, EliteTriangle does it all. It's the ultimate college community hub.",
    },
  ];

  // Automatically cycle through reviews
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveReview((prev) => (prev + 1) % reviews.length);
    }, 3000); // Change every 3 seconds
    return () => clearInterval(interval);
  }, [reviews.length]);

  // Scroll to Stay Connected section
  const handleJoinUs = () => {
    stayConnectedRef.current.scrollIntoView({ behavior: "smooth" });
    const element = stayConnectedRef.current.querySelector(".section-title");
    element.classList.add("glow");
    setTimeout(() => {
      element.classList.remove("glow");
    }, 3000); // Glow effect lasts 3 seconds
  };

  return (
    <div className="learn-more-container">
      {/* Hero Section */}
      <section className="hero-section">
        <TypeAnimation
          sequence={[
            "Welcome to EliteTriangle",
            2000,
            "Connecting Innovative Minds",
            2000,
            "Your Academic Network Hub",
            2000,
          ]}
          wrapper="h1"
          cursor={true}
          repeat={Infinity}
          className="hero-title"
        />
        <p className="hero-subtitle">
          Connecting Springfield College students with creativity, innovation, fun.
        </p>
        <div className="hero-buttons">
          <button className="hero-button explore" onClick={() => setShowPopup(true)}>
            Explore Features
          </button>
          <button className="hero-button join" onClick={handleJoinUs}>
            Join Us
          </button>
        </div>
      </section>

      {/* Explore Features Popup */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Do you want to go to the homepage?</p>
            <div className="popup-buttons">
              <button onClick={() => navigate("/")}>OK</button>
              <button onClick={() => setShowPopup(false)}>Not Now</button>
            </div>
          </div>
        </div>
      )}

      {/* Founder Section */}
      <section className="founder-section">
        <h2 className="section-title">Founder & CEO</h2>
        <div className="founder-card">
          <img
            src="/images/founder.jpg"
            alt="Founder"
            className="founder-photo"
          />
          <div className="founder-text">
            <h3>Tofael Hossain</h3>
            <p>
              Tofael Hossain is the visionary behind EliteTriangle, bringing his passion
              for technology and community building to life. Under his leadership,
              the platform thrives as the go-to network for Springfield College
              students.
            </p>
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="team-section">
        <h2 className="section-title">Meet the Team</h2>
        <div className="team-cards">
          {team.map((member, index) => (
            <div className="team-card" key={index}>
              <div className="team-card-inner">
                <div className="team-card-front">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="team-photo"
                  />
                  <h3 className="team-name">{member.name}</h3>
                  <p className="team-role">{member.role}</p>
                </div>
                <div className="team-card-back">
                  <p className="team-description">{member.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Our Users Say Section */}
      <section className="reviews-section">
        <h2 className="section-title">What Our Users Say</h2>
        <div className="reviews-carousel">
          <div className="review-card">
            <img src={reviews[activeReview].photo} alt={reviews[activeReview].name} className="review-photo" />
            <p className="review-comment">"{reviews[activeReview].comment}"</p>
            <h4 className="review-name">- {reviews[activeReview].name}</h4>
          </div>
        </div>
      </section>

      {/* Stay Connected Section */}
      <section className="social-section" ref={stayConnectedRef}>
        <h2 className="section-title">Stay Connected</h2>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-section">
        <p className="address">
          263 Alden Steet, Springfield, MA, USA
        </p>
        <p className="copyright">
          © {new Date().getFullYear()} EliteTriangle. All rights reserved.
        </p>
      </footer>
    </div>
  );
  return <div>Learn More Page Content</div>;
};

export default LearnMore;
