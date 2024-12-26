import React from "react";
import "./FoodPage.css";
import traditionalFood from "../../../assets/images/traditional_food.jpg";
import mantije from "../../../assets/images/mantije.jpg";
import ButtonAnimated from "../../Button/ButtonAnimated";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

type Props = {};

const FoodPage = (props: Props) => {
  const navigate = useNavigate();

  return (
    <div className="foodpage-wrapper">
      <img
        src={traditionalFood}
        alt="traditonal_food"
        className="block block-1"
      ></img>
      <div className="block block-2">
        <h1>Probajte ukuse kraja!</h1>
        <p>Uživajte u ukusima tradicionalne kuhinje i autentičnoj atmosferi.</p>
        <NavLink to={"/explore"}>
          <ButtonAnimated text="Istraži" />
        </NavLink>
      </div>
      <div className="block block-3">
        <h1>Ukoliko imate preduzeće kreirajte stranicu ovde!</h1>
        <p>
          Na portalu NP.click kreirajte stranicu i uz nekoliko koraka postanite
          turistička atrakcija Novog Pazara.
        </p>
        <NavLink to={"/register_company"}>
          <ButtonAnimated text="Kreiraj nalog" />
        </NavLink>
      </div>
      <img src={mantije} alt="mantije" className="block block-4"></img>
    </div>
  );
};

export default FoodPage;
