import React from "react";
import { useNavigate } from "react-router-dom";
import TouristCard from "../../TouristCard/TouristCard";
import "./Categories.css";
import { PiChurch, PiMosque } from "react-icons/pi";
import { GiAncientRuins, GiTreeGrowth } from "react-icons/gi";

type Props = {};

const Categories = (props: Props) => {
  const navigate = useNavigate();

  const handleCardClick = (category: string) => {
    navigate(`/attractions?category=${category}`);
  };

  return (
    <div className="app-container">
      <h1 className="main-title">Upoznajte se sa kulturom grada.</h1>
      <div className="card-container">
        <TouristCard
          title="Islamski spomenici"
          subtitle="Spomenici kulture"
          description="Otkrijte bogatstvo islamskih spomenika u Novom Pazaru."
          buttonText="Istraži"
          bgColor="#003333"
          buttonColor="#FF5C5C"
          icon={<PiMosque size={40} />}
          category="islamic"
          onClick={() => handleCardClick("islamic")}
        />
        <TouristCard
          title="Hrišćanski spomenici"
          subtitle="Spomenici kulture"
          description="Posetite hrišćanske spomenike i istražite njihovu kulturnu vrednost."
          buttonText="Istraži"
          bgColor="#D84C47"
          buttonColor="#FF5C5C"
          icon={<PiChurch size={40} />}
          category="christian"
          onClick={() => handleCardClick("christian")}
        />
        <TouristCard
          title="Prirodne lepote Novog Pazara"
          subtitle="Prirodni spomenici"
          description="Uživajte u jedinstvenoj prirodi Novog Pazara i okoline."
          buttonText="Istraži"
          bgColor="#006D5B"
          buttonColor="#36B37E"
          icon={<GiTreeGrowth size={40} />}
          category="natural"
          onClick={() => handleCardClick("natural")}
        />
        <TouristCard
          title="Istorijski spomenici"
          subtitle="Spomenici kulture"
          description="Saznajte više o kulturnim spomenicima i njihovoj istorijskoj zaostavštini."
          buttonText="Istraži"
          bgColor="#C4B39A"
          buttonColor="#FF5C5C"
          icon={<GiAncientRuins size={40} />}
          category="historic"
          onClick={() => handleCardClick("historic")}
        />
      </div>
    </div>
  );
};

export default Categories;
