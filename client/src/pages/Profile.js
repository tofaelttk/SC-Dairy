import React, { useState, useEffect } from "react";
import axios from "../api/axios"; // Ensure axios is correctly imported
import "../styles/Profile.css"; // Import your profile styles

const Profile = () => {
  const [profile, setProfile] = useState(null); // Stores user profile
  const [editMode, setEditMode] = useState(false); // Toggles between view/edit modes
  const [updatedData, setUpdatedData] = useState({});
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  // Fetch the user's profile on component mount
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await axios.get("/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setUpdatedData(response.data); // Pre-fill the form with existing data
      } catch (err) {
        console.error("Failed to load profile:", err);
      }
    };
    loadProfile();
  }, [token]);

  // Handle input changes
  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  // Handle profile update
  const handleUpdate = async (e) => {
    e.preventDefault();
    console.log("Updating profile with data:", updatedData);

    try {
      const response = await axios.put("/profile", updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Profile updated successfully:", response.data);

      setProfile(response.data);
      setEditMode(false);
      setMessage("Profile updated successfully!");
    } catch (err) {
      console.error("Failed to update profile:", err.response?.data || err.message);
      setMessage("Failed to update profile. Please try again.");
    }
  };

  // Handle profile picture upload
  const handleProfilePictureChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      const response = await axios.post("/profile/profile-picture", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      setProfile({ ...profile, profilePicture: response.data.profilePicture });
      setMessage("Profile picture updated successfully!");
    } catch (err) {
      console.error("Failed to update profile picture:", err);
      setMessage("Failed to update profile picture. Please try again.");
    }
  };

  if (!profile) return <p className="loading">Loading profile...</p>;

  return (
    <div className="profile-container">
      <h1 className="profile-title">My Profile</h1>
      {message && <p className="profile-message">{message}</p>}
      <div className="profile-card">
        {!editMode ? (
          <div className="profile-view">
            <div className="profile-header">
              <img
                src={profile.profilePicture || "default-profile.png"}
                alt="Profile"
                className="profile-picture"
              />
              <h2>{profile.name}</h2>
            </div>
            <p><strong>Bio:</strong> {profile.bio || " "}</p>
            <p><strong>Class Year:</strong> {profile.classOfYear || "N/A"}</p>
            <p><strong>Sports:</strong> {profile.sports.join(", ") || "N/A"}</p>
            <p><strong>Relationship Status:</strong> {profile.relationshipStatus || "N/A"}</p>
            <p><strong>Majors/Minors:</strong> {profile.majorsMinors.join(", ") || "N/A"}</p>
            <button onClick={() => setEditMode(true)} className="btn">
              Edit Profile
            </button>
          </div>
        ) : (
          <form onSubmit={handleUpdate} className="profile-edit">
            <label>Profile Picture</label>
            <input
              type="file"
              onChange={handleProfilePictureChange}
              className="profile-upload"
            />
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={updatedData.name || ""}
              onChange={handleChange}
              required
            />
            <label>Bio</label>
            <textarea
              type="text"
              name="bio"
              value={updatedData.bio || ""}
              onChange={handleChange}
              rows="3"
            />
            <label>Class Year</label>
            <input
              type="number"
              name="classOfYear"
              value={updatedData.classOfYear || ""}
              onChange={handleChange}
            />
            <label>Sports</label>
            <input
              type="text"
              name="sports"
              value={(updatedData.sports || []).join(", ")}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  sports: e.target.value.split(",").map((sport) => sport.trim()),
                })
              }
            />
            <label>Relationship Status</label>
            <input
              type="text"
              name="relationshipStatus"
              value={updatedData.relationshipStatus || ""}
              onChange={handleChange}
            />
            <label>Majors/Minors</label>
            <input
              type="text"
              name="majorsMinors"
              value={(updatedData.majorsMinors || []).join(", ")}
              onChange={(e) =>
                setUpdatedData({
                  ...updatedData,
                  majorsMinors: e.target.value.split(",").map((item) => item.trim()),
                })
              }
            />
            <button type="submit" className="btn btn-save">
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setEditMode(false)}
              className="btn btn-cancel"
            >
              Cancel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;
