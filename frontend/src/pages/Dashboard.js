import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { isAuthenticated } from "../utils/auth";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
      <div className="dashboard-container">
        <h1>Utilities Dashboard</h1>
        <p>Welcome! Access your utilities here.</p>
      </div>
  );
};

export default Dashboard;
