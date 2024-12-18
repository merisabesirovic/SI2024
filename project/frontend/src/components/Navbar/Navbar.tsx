import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ButtonAnimated from "../Button/ButtonAnimated";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className={`navbar-links ${isOpen ? "open" : ""}`}>
        <NavLink to={"/"}>
          <button>Početna</button>
        </NavLink>
        <NavLink to={"/explore"}>
          <button>Istraži</button>
        </NavLink>
        <NavLink to={"/aboutus"}>
          <button>O nama</button>
        </NavLink>
        <NavLink to={"/contact"}>
          <button>Kontakt</button>
        </NavLink>
        <NavLink to={"/login"}>
          <ButtonAnimated text={"Login"} />
        </NavLink>
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </nav>
  );
};
export default Navbar;
