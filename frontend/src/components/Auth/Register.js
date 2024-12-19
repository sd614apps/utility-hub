import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService"; // Ensure this points to your auth service
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  if (!formData) {
    setError("Form data is required");
    return;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Additional client-side validation (example)
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    // Remove '+' prefix from phone number if present
    const sanitizedPhone = formData.phone.startsWith('+') ? formData.phone.slice(1) : formData.phone;

    // Map form data to expected field names
    const mappedFormData = {
      full_name: formData.fullName,
      email: formData.email,
      phone: sanitizedPhone,
      username: formData.username,
      password: formData.password,
    };
  
    try {
      await registerUser(mappedFormData); // Call backend API
      setSuccess("Registration successful! You can now log in.");
      setError(null);
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        username: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Registration error:", err); // Log the error for debugging
      setError(err.message || "An error occurred during registration");
      setSuccess(null);
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        {!success && <button type="submit">Register</button>}
      </form>
      {error && <p className="error">{error}</p>}
      {success && (
        <div>
          <p className="success">{success}</p>
          <button
            onClick={() => navigate("/login")}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            Go to Login
          </button>
        </div>
      )}
    </div>
  );
};

export default Register;
