import React, { useState, useEffect } from "react";
import "../styles/global.css";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedMode);
    document.body.className = savedMode ? "dark-mode" : "";
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
    document.body.className = newMode ? "dark-mode" : "";
  };

  return (
    <div className="settings-container">
      <h1>Settings</h1>
      <div className="toggle-container">
        <span>Enable Dark Mode</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
