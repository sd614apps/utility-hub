import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { isAuthenticated } from "../utils/auth";
import Layout from "./Layout";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  return (
    <Layout>
      <div className="dashboard-container">
        <h1>Utilities Dashboard</h1>
        <p>Welcome! Access your utilities here.</p>
        <button
          onClick={handleLogout}
          className="button logout-button"
        >
          Logout
        </button>
      </div>
    </Layout>
  );
};

export default Dashboard;
