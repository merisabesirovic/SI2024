import React from "react";
import "./Welcome.css";
import ButtonAnimated from "../../components/Button/ButtonAnimated";

import Categories from "../Categories/Categories";
import Sebiljpage from "../HamamPage/Sebiljpage";
import CarouselPage from "../CarouselPage/CarouselPage";
import FoodPage from "../FoodPage/FoodPage";

const Welcome = (props: {}) => {
  return (
    <div className="welcome-page">
      <div className="welcome-wrapper">
        <video autoPlay muted loop className="video-wrapper">
          <source src="/videos/NoviPazar.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <p className="small-text">
            Discover the world's most captivating destinations
          </p>
          <h1>
            Unlock the Secrets of <br></br> Unforgettable
          </h1>
          <p className="mid-text">
            Embark on a Transformative Travel Experience
          </p>
          <ButtonAnimated text="Explore" />
        </div>
      </div>
      <Categories />
      <Sebiljpage />
      <CarouselPage />
      <FoodPage />
    </div>
  );
};

export default Welcome;
