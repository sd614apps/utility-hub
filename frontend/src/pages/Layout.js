import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/Layout.css";
import { FaUserCircle } from "react-icons/fa";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Utility Hub</h2>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>
            Dashboard
          </NavLink>
          <NavLink to="/utility1" className={({ isActive }) => isActive ? "active-link" : ""}>
            Utility 1
          </NavLink>
          <NavLink to="/utility2" className={({ isActive }) => isActive ? "active-link" : ""}>
            Utility 2
          </NavLink>
          <NavLink to="/utility3" className={({ isActive }) => isActive ? "active-link" : ""}>
            Utility 3
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h1 className="top-bar-title">Utility Hub</h1>
          <div className="user-menu">
            <FaUserCircle size={30} className="user-icon" />
            <div className="user-dropdown">
              <NavLink to="/profile" className="dropdown-link">Profile</NavLink>
              <NavLink to="/settings" className="dropdown-link">Settings</NavLink>
              <button
                className="dropdown-link logout-button"
                onClick={() => {
                  localStorage.removeItem("userToken");
                  window.location.href = "/login";
                }}
              >
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Content Outlet */}
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
