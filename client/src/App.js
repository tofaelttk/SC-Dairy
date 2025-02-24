import React from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import MainPage from "./pages/MainPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UploadProfilePicture from "./pages/UploadProfilePicture";
import MainApp from "./pages/MainApp";
import LearnMore from "./pages/LearnMore";
import Logout from "./pages/Logout"; 

const App = () => {
  const location = useLocation();

  const shouldShowNavbar = !["/home"].includes(location.pathname); // Add paths where Navbar should NOT appear

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/upload-profile-picture" element={<UploadProfilePicture />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<MainApp />} />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/logout" element={<Logout />} /> {/* Add this line */}
      </Routes>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
