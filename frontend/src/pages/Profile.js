import React, { useState, useEffect } from "react";
import { fetchUserProfile, updateUserProfile } from "../services/authService";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ full_name: "", email: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetchUserProfile();
        setUser(response);
        setUpdatedUser({ full_name: response.full_name, email: response.email });
        setError(null);
      } catch (err) {
        setError("Failed to load user data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      setLoading(true);
      const response = await updateUserProfile(updatedUser);
      setUser(response);
      setEditing(false);
      alert("Profile updated successfully!");
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {editing ? (
        <div>
          <label>
            Full Name:
            <input
              type="text"
              name="full_name"
              value={updatedUser.full_name}
              onChange={handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={updatedUser.email}
              onChange={handleInputChange}
            />
          </label>
          <button onClick={handleUpdate}>Save Changes</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Full Name:</strong> {user.full_name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
