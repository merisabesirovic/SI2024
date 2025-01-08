import React from "react";
import sebilj from "../../../assets/images/sebilj.jpg";
import ButtonAnimated from "../../Button/ButtonAnimated";
import "./Sebiljpage.css";
import { NavLink } from "react-router-dom";
type Props = {};

const Sebiljpage = (props: Props) => {
  return (
    <div className="wrapper">
      <div className="left-part">
        <h1>Grad gde se susreću Istok i Zapad.</h1>
        <p>Otkrijte bogatu istoriju kroz stare džamije i crkve</p>

        <p>
          Otkrijte čari autentične kuhinje, znamenitosti i prirodnih lepota ovog
          jedinstvenog mesta.
        </p>
        <NavLink to={"/explore"}>
          <ButtonAnimated text="Otkrij" />
        </NavLink>
      </div>
      <div className="right-part">
        <img src={sebilj} alt="hamam" />
      </div>
    </div>
  );
};

export default Sebiljpage;
