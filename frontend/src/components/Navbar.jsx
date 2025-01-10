import "../App.css";
import "../stylesheets/Navbar.css";
import React, { useEffect, useState } from 'react'
import { HiMenuAlt3 } from "react-icons/hi";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";;
import Auth from '../pages/Auth';

const Navbar = () => {

  const [dialogOpen, setDialogOpen] = useState(false);

  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    document.body.className = theme; // Add theme to body for global styling
  }, [theme]);


  return (
    <header >
      <div className="logo">
        <img src="/images/logo.png" alt="Tonemaki logo" />
      </div>
      <nav>
        <div className="menu">
          <a href="#works">Work</a>
          <a href="#gallery">Gallery</a>
          <a href="#veterinery">Veterinery</a>
        </div>
        <HiMenuAlt3 className='hamburger' style={{ fontSize: '30px', display: 'none' }} />
      </nav>
      <div className="actions">
        <div className="theme" onClick={toggleTheme}>
        {
          (theme==='dark') ? <CiLight style={{ fontSize: '30px' }}/> : <MdDarkMode style={{ fontSize: '30px' }}/>
        }
        </div>
        <button className="login-button" onClick={() => setDialogOpen(true)}>Login</button>
        <Auth open={dialogOpen} onClose={() => setDialogOpen(false)}/>
      </div>
    </header>
  )
};

export default Navbar;
