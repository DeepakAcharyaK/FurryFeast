import "../stylesheets/Navbar.css";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const { userid } = useParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = window.localStorage.getItem("role");
  const isloggedin = window.localStorage.getItem("isloggedin") === "true";

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    window.localStorage.removeItem("isloggedin");
    window.localStorage.removeItem("role");
    window.open('/', '_self');
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo" onClick={() => navigate(`/${userid}`)}>
          <img src="/images/logo.png" alt="Tonemaki Logo" />
        </div>

        {isloggedin && role === "customer" && (
          <>
            <menu>
              <ul className={isMenuOpen ? "open" : ""}>
                <li onClick={() => navigate(`/user/${userid}/view-veterinary`)}>Veterinary</li>
                <li onClick={() => navigate(`/user/${userid}/view-gallery`)}>Gallery</li>
                <li onClick={() => navigate(`/user/${userid}/adopt/pets`)}>Adopt</li>
                <li onClick={() => navigate(`/user/${userid}/pets/rescue`)}>Rescue</li>
                <li onClick={() => navigate(`/user/${userid}/make-a-donation`)}>Donation</li>
                <li onClick={() => navigate(`/user/${userid}/view-available-works`)}>Works</li>
              </ul>
            </menu>
          </>
        )}

        <div className="actions">
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? (
              <CiLight style={{ fontSize: "30px" }} />
            ) : (
              <MdDarkMode style={{ fontSize: "30px" }} />
            )}
          </div>

          {isloggedin ? (
            <>
              <div className="profile" style={{ cursor: "pointer" }}>
                <FaUserCircle
                  onClick={toggleSidebar}
                  style={{ fontSize: "30px", marginRight: "10px" }}
                />
              </div>
              <button onClick={handleLogout} className="auth-button" style={{ backgroundColor: "red" }}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="auth-button signup-button"
              >
                Signup
              </button>
              <button onClick={() => navigate("/login")} className="auth-button">
                Login
              </button>
            </>
          )}
        </div>

        <HiMenuAlt3
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>

      {isSidebarOpen && <Sidebar userid={userid} isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}
    </header>
  );
};

export default Navbar;
