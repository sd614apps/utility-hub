import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if no session
    const token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Utilities Dashboard</h1>
      <p>Welcome! Access your utilities here.</p>
      <button
        onClick={() => {
          localStorage.removeItem("userToken"); // Log out
          navigate("/");
        }}
        style={{ padding: "10px 20px", fontSize: "16px", marginTop: "20px" }}
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
