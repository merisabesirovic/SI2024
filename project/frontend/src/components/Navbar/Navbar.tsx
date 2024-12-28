import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import ButtonAnimated from "../Button/ButtonAnimated";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { IoMdLogOut } from "react-icons/io";
import Modal from "../Modal/Modal";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setToken(null);
    setUserId(null);
    setUserRole(null);

    setIsModalOpen(false);
    navigate("/");
  };
  const handleNavigate = () => {};

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const { token, userRole, setToken, setUserId, setUserRole } =
    useContext(AppContext);

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
        {token ? (
          <>
            <NavLink to={"/user_home"}>
              <button className="button">Moj profil</button>
            </NavLink>
            <button className="button" onClick={() => setIsModalOpen(true)}>
              Logout
              <IoMdLogOut size={20} />
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/login"}>
              <ButtonAnimated text={"Login"} />
            </NavLink>
            <NavLink to={"/register"}>
              <ButtonAnimated text={"Register"} />
            </NavLink>
          </>
        )}
      </div>
      <div className="navbar-hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {isModalOpen && (
        <Modal
          title="Logout?"
          description="Jeste li sigurni da želite da se izlogujete?"
          actionLabel="Logout"
          onAction={handleLogout}
          onClose={handleCloseModal}
        />
      )}
    </nav>
  );
};

export default Navbar;
