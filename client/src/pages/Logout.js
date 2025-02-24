import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear the authentication token
    localStorage.removeItem("token");

    // Redirect to the main page after logout
    navigate("/");
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Logging you out...</h1>
      <p>Redirecting to the main page.</p>
    </div>
  );
};

export default Logout;
