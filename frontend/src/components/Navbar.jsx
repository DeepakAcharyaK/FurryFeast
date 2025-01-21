import "../stylesheets/Navbar.css";
import React, { useEffect, useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { Navigate, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const role = window.localStorage.getItem('role');
  const isloggedin = window.localStorage.getItem('isloggedin');

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handlelogout=()=>{
    window.localStorage.removeItem('isloggedin');
    window.localStorage.removeItem('role');
    navigate("/")
  }

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="logo" onClick={() => navigate("/")}>
          <img src="/images/logo.png" alt="Tonemaki Logo" />
        </div>

        {
          isloggedin && role === 'customer' && (
            <>
              <menu>
                <ul className={isMenuOpen ? "open" : ""}>
                  <li onClick={()=>navigate("/login")}>Works</li>
                  <li onClick={()=>navigate("/viewveterinary")}>Veterinary</li>
                  <li onClick={()=>navigate("/viewgallery")}>Gallery</li>
                  <li onClick={()=>navigate("/viewadoptpets")}>Adopt</li>
                  <li onClick={()=>navigate("/addresues")}>Rescue</li>
                  <li onClick={()=>navigate("/adddonations")}>Donation</li>
                </ul>
              </menu>
            </>
          )
        }


        <div className="actions">
          <div className="theme-toggle" onClick={toggleTheme}>
            {theme === "dark" ? (
              <CiLight style={{ fontSize: "30px" }} />
            ) : (
              <MdDarkMode style={{ fontSize: "30px" }} />
            )}
          </div>

          {
            isloggedin === 'true' && (
              <>
                <div className="profile" style={{cursor:'pointer'}}>
                  <FaUserCircle onClick={toggleSidebar}  style={{ fontSize: "30px", marginRight: "10px" }}/>
                </div>
                <button onClick={handlelogout} className="auth-button" style={{ backgroundColor: 'red' }}>Logout</button>
              </>
            )
          }


          {
            !isloggedin &&(
              <>
                <button onClick={()=>navigate("/signup")} className="auth-button signup-button">Signup</button>
                <button onClick={()=>navigate("/login")} className="auth-button">Login</button>
              </>
            )
          }
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
