// Profile.js
import React, { useState, useEffect } from "react";
import "../styles/global.css";

const Profile = () => {
  const [user, setUser] = useState({ name: "", email: "" });
  const [editing, setEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ name: "", email: "" });

  useEffect(() => {
    // Fetch user details from API or local storage
    const fetchUser = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
      setUpdatedUser(userData);
    };
    fetchUser();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  const handleUpdate = async () => {
    // Simulate API call to update user
    setUser(updatedUser);
    setEditing(false);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    alert("Profile updated successfully!");
  };

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {editing ? (
        <div>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={updatedUser.name}
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
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
