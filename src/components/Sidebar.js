import "./Sidebar.css";
import { useState } from "react";
import logo from "../assets/logo.svg";
import moon from "../assets/icon-moon.svg";
import sun from "../assets/icon-sun.svg";
import avatar from "../assets/image-avatar.jpg";

function Sidebar() {
  const [darkMode, setDarkMode] = useState(false);

  document.body.className = darkMode ? "dark-mode" : "";

  function handleThemeIcon() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="sidebar">
      <div className="logo-wrapper">
        <img src={logo} alt="logo" className="logo" />
      </div>
      <div className="logo-bottom"></div>
      <div className="theme-box">
        <img
          src={moon}
          alt="moon icon"
          className={`theme-icon ${darkMode ? "hidden" : ""}`}
          onClick={handleThemeIcon}
        />
        <img
          src={sun}
          alt="sun icon"
          className={`theme-icon ${darkMode ? "" : "hidden"}`}
          onClick={handleThemeIcon}
        />
      </div>
      <img src={avatar} alt="avatar" className="avatar" />
    </div>
  );
}

export default Sidebar;
