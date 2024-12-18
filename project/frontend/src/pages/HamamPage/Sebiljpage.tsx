import React from "react";
import sebilj from "../../assets/images/sebilj.jpg";
import ButtonAnimated from "../../components/Button/ButtonAnimated";
import "./Sebiljpage.css";
type Props = {};

const Sebiljpage = (props: Props) => {
  return (
    <div className="wrapper">
      <div className="left-part">
        <h1>Immerse in the </h1>
        <p>Unlock the Secrets of Unforgettable Travel</p>

        <p>
          Discover the World's Most Captivating Destinations: Unlock the Secrets
          of Transformative Travel Experiences
        </p>
        <ButtonAnimated text="Explore" />
      </div>
      <div className="right-part">
        <img src={sebilj} alt="hamam" />
      </div>
    </div>
  );
};

export default Sebiljpage;
