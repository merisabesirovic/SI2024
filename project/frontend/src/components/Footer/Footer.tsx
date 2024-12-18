import React from "react";
import logo from "../../assets/images/logo.png";
import { TbNoCopyright } from "react-icons/tb";

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
        <p>Početna</p>
        <p>Istraži</p>
        <p>O nama</p>
        <p>Kontakt</p>
      </div>
      <div className="socials">
        <p>Instagram</p>
        <p>Facebook</p>
        <p>Twitter</p>
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
