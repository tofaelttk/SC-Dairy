import React, { useState } from "react";
import axios from "../api/axios"; // Ensure this points to your backend
import { useNavigate } from "react-router-dom";
import "../styles/UploadProfilePicture.css";

const UploadProfilePicture = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post("/profile/profile-picture", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile picture uploaded successfully!");
      navigate("/"); // Redirect to login
    } catch (err) {
      console.error("Failed to upload profile picture:", err);
      setMessage("Failed to upload profile picture. Please try again.");
    }
  };

  const handleSkip = () => {
    alert("You can upload your profile picture later.");
    navigate("/"); // Redirect to login
  };

  return (
    <div className="upload-container">
      <h2>Upload Profile Picture</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <button onClick={handleSkip}>Skip</button>
      {message && <p className="upload-message">{message}</p>}
    </div>
  );
};

export default UploadProfilePicture;
