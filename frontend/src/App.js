import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // Import Profile component
import Settings from "./pages/Settings"; // Import Settings component
import Layout from "./pages/Layout"; // Import Layout
import InterestCalculator from "./pages/InterestCalculator/InterestCalculator";
import FDRDCalculator from "./pages/FDRDCalculator/FDRDCalculator";
import LoanAmortization from "./pages/LoanAmortization/LoanAmortization";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Routes Wrapped with Layout */}
        <Route path="/" element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="interest-calculator" element={<InterestCalculator />} />
          <Route path="fd-rd-calculator" element={<FDRDCalculator />} />
          <Route path="loan-amortization" element={<LoanAmortization />} />

        </Route>
      </Routes>
    </Router>
  );
}

export default App;
