import React from "react";
import "./Welcome.css";
import ButtonAnimated from "../../components/Button/ButtonAnimated";
import Categories from "../../components/WelcomePageComponents/Categories/Categories";
import Sebiljpage from "../../components/WelcomePageComponents/SebiljPage/Sebiljpage";
import CarouselPage from "../../components/WelcomePageComponents/CarouselPage/CarouselPage";
import FoodPage from "../../components/WelcomePageComponents/FoodPage/FoodPage";

const Welcome = (props: {}) => {
  return (
    <div className="welcome-page">
      <div className="welcome-wrapper">
        <video autoPlay muted loop className="video-wrapper">
          <source src="/videos/NoviPazar.mp4" type="video/mp4" />
        </video>
        <div className="container">
          <h1>
            Dobrodošli u <br></br> Novi Pazar!
          </h1>
          <p className="mid-text">
            Otkrijte, Istražite i Uživajte u Gradu Novi Pazar preko našeg
            portala.
          </p>
          <ButtonAnimated text="Istraži" />
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
