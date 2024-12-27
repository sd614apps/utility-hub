import React, { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";
import { FaUserCircle } from "react-icons/fa";

const Layout = () => {
  const navigate = useNavigate();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("userToken");
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  return (
    <div className="layout-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="sidebar-title">Utility Hub</h2>
        <nav className="sidebar-nav">
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/interest-calculator" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Interest Calculator
          </NavLink>
          <NavLink to="/fd-rd-calculator" className={({ isActive }) => (isActive ? "active-link" : "")}>
            FD & RD Calculator
          </NavLink>
          <NavLink to="/loan-amortization" className={({ isActive }) => (isActive ? "active-link" : "")}>
            Loan Amortization
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="top-bar">
          <h1 className="top-bar-title">Utility Hub</h1>
          <div className="user-menu">
            <FaUserCircle size={30} className="user-icon" onClick={toggleDropdown} />
            {dropdownVisible && (
              <div className="user-dropdown">
                <NavLink to="/profile" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                  Profile
                </NavLink>
                <NavLink to="/settings" className="dropdown-link" onClick={() => setDropdownVisible(false)}>
                  Settings
                </NavLink>
                <button onClick={handleLogout} className="logout-button">
                  Logout
                </button>
              </div>
            )}
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
