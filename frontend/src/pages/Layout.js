import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "../styles/global.css";

const Layout = () => {
  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Utility Hub</h2>
        <nav>
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
          <h1>Utility Hub</h1>
          <div className="user-menu">
            <button className="user-button">User &#9662;</button>
            <div className="user-dropdown">
              <NavLink to="/profile">Profile</NavLink>
              <NavLink to="/settings">Settings</NavLink>
              <button
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
