import "../App.css";
import "../stylesheets/Navbar.css";
import React, { useEffect, useState } from "react";
import Auth from "../pages/Auth";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa"; // Profile icon

const Navbar = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track authentication
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    document.body.className = theme; // Add theme to body for global styling
  }, [theme]);

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false); // Update state
    alert("Logged out successfully!"); // Optional
  };


  console.log(isAuthenticated)

  return (
    <header>
      <div className="logo">
        <img src="/images/logo.png" alt="Tonemaki logo" />
      </div>
      <nav>
        <div className="menu">
          <a href="#works">Work</a>
          <a href="#gallery">Gallery</a>
          <a href="#veterinery">Veterinery</a>
          {/* Additional menu items if authenticated */}
          {isAuthenticated && (
            <>
              <a href="#dashboard">Dashboard</a>
              <a href="#settings">Settings</a>
              <a href="#profile">Profile</a>
              <a href="#notifications">Notifications</a>
              <a href="#support">Support</a>
            </>
          )}
        </div>
        <HiMenuAlt3 className="hamburger" style={{ fontSize: "30px", display: "none" }} />
      </nav>
      <div className="actions">
        <div className="theme" onClick={toggleTheme}>
          {theme === "dark" ? <CiLight style={{ fontSize: "30px" }} /> : <MdDarkMode style={{ fontSize: "30px" }} />}
        </div>
        {isAuthenticated ? (
          <>
            <FaUserCircle style={{ fontSize: "30px", marginRight: "10px" }} />
            <button className="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          <button className="login-button" onClick={() => setDialogOpen(true)}>
            Login
          </button>
        )}
        <Auth open={dialogOpen} onClose={() => setDialogOpen(false)} onLoginSuccess={() => setIsAuthenticated(true)} />
      </div>
    </header>
  );
};

export default Navbar;
