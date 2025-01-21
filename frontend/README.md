import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import "../stylesheets/Navbar.css";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isloggedin") === "true"
  );
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleLogout = () => {
    localStorage.removeItem("isloggedin");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/");
  };

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/images/logo.png" alt="Tonemaki Logo" />
        </div>

        <menu>
          <ul className={isMenuOpen ? "open" : ""}>
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink to="/viewgallery" onClick={() => setIsMenuOpen(false)}>
                    Gallery
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/viewadoptpets" onClick={() => setIsMenuOpen(false)}>
                    Adopt
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/adddonations" onClick={() => setIsMenuOpen(false)}>
                    Donation
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/viewveterinary" onClick={() => setIsMenuOpen(false)}>
                    Veterinary
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/settings" onClick={() => setIsMenuOpen(false)}>
                    Settings
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink to="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/signup" onClick={() => setIsMenuOpen(false)}>
                    Signup
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </menu>

        <div className="actions">
          {isLoggedIn ? (
            <>
              <div className="theme-toggle" onClick={toggleTheme}>
                {theme === "dark" ? (
                  <CiLight style={{ fontSize: "30px" }} />
                ) : (
                  <MdDarkMode style={{ fontSize: "30px" }} />
                )}
              </div>
              <div className="profile">
                <FaUserCircle style={{ fontSize: "30px", marginRight: "10px" }} />
              </div>
              <button
                className="auth-button"
                style={{ backgroundColor: "red" }}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : null}
        </div>

        <HiMenuAlt3
          className="menu-icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
      </div>
    </header>
  );
};

export default Navbar;
