import React from "react";
import "./FoodPage.css";
import traditionalFood from "../../assets/images/traditional_food.jpg";
import mantije from "../../assets/images/mantije.jpg";
import ButtonAnimated from "../../components/Button/ButtonAnimated";

type Props = {};

const FoodPage = (props: Props) => {
  return (
    <div className="foodpage-wrapper">
      <img
        src={traditionalFood}
        alt="traditonal_food"
        className="block block-1"
      ></img>
      <div className="block block-2">
        <h1>Immerse in the Beauty</h1>
        <p>
          Explore Now Unlock the Secrets of a Rewarding Career: Embark on a
          Transformative Journey with Our Exceptional Team
        </p>
        <ButtonAnimated text="Explore" />
      </div>
      <div className="block block-3">
        <h1>Immerse in the Beauty</h1>
        <p>
          Explore Now Unlock the Secrets of a Rewarding Career: Embark on a
          Transformative Journey with Our Exceptional Team
        </p>
        <ButtonAnimated text="Explore" />
      </div>
      <img src={mantije} alt="mantije" className="block block-4"></img>
    </div>
  );
};

export default FoodPage;
