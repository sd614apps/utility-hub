import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate("/dashboard"); // Redirect to dashboard if session is active
    }
  }, [navigate]);

  return (
    <div className="home-container">
      <h1>Welcome to Utility Hub</h1>
      <p>Access a wide range of utilities, all in one place!</p>
      <div className="home-buttons">
        <button onClick={() => navigate("/login")}>Login</button>
        <button onClick={() => navigate("/register")}>Register</button>
      </div>
    </div>
  );
};

export default Home;
