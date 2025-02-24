import axios from "./axios";

// Fetch user profile
export const fetchProfile = async (token) => {
  const response = await axios.get("/profile", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update user profile
export const updateProfile = async (token, updatedData) => {
  const response = await axios.put("/profile", updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};
