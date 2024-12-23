import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api/auth"; // Use environment variable or fallback to localhost

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, userData);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

// Fetch user profile
export const fetchUserProfile = async () => {
  const token = localStorage.getItem("userToken");
  const response = await axios.get(`${API_BASE_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData) => {
  const token = localStorage.getItem("userToken");
  const response = await axios.put(`${API_BASE_URL}/profile`, userData, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};