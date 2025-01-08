import React from "react";
import logo from "../../assets/images/logo.png";
import { TbNoCopyright } from "react-icons/tb";
import { NavLink } from "react-router-dom";

import "./Footer.css";
type Props = {};
const date = new Date().getFullYear();
const Footer = (props: Props) => {
  return (
    <div className="footer">
      <div className="logo-section">
        <img src={logo} alt="logo" />
        <p>
          <TbNoCopyright /> {date}{" "}
        </p>
        <p>All rights reserved</p>
      </div>
      <div className="links">
        <NavLink to={"/"}>
          <p>Početna</p>
        </NavLink>
        <NavLink to={"/explore"}>
          <p>Istraži</p>
        </NavLink>
        <NavLink to={"/aboutus"}>
          <p>O nama</p>
        </NavLink>
      </div>
      <div className="socials">
        <p>Email:</p>
        <p>np.click.projekat@gmail.com</p>
      </div>
      <div className="team">
        <p>Team</p>
        <p>Bold Blondes</p>
        <p>NP.click</p>
      </div>
    </div>
  );
};

export default Footer;
