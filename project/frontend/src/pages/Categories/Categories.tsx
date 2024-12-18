import React from "react";
import TouristCard from "../../components/TouristCard/TouristCard";
import "./Categories.css";
import { PiChurch } from "react-icons/pi";
import { PiMosque } from "react-icons/pi";
import { GiAncientRuins } from "react-icons/gi";
import { GiTreeGrowth } from "react-icons/gi";

type Props = {};

const Categories = (props: Props) => {
  return (
    <div className="app-container">
      <h1 className="main-title">Immerse in the Beauty</h1>
      <div className="card-container">
        <TouristCard
          title="Explore Hidden"
          subtitle="Discover Breathtaking"
          description="Unlock the Secrets of Cultural Immersion: Embark on a Transformative Travel"
          buttonText="Experience the Adventure"
          bgColor="#003333"
          buttonColor="#FF5C5C"
          icon={<PiMosque size={40} />}
        />
        <TouristCard
          title="Explore the"
          subtitle="Discover the World's"
          description="Unlock the Secrets of Cultural Immersion: Embark on a Transformative Travel Journey"
          buttonText="Experience the Thrill"
          bgColor="#D84C47"
          buttonColor="#FF5C5C"
          icon={<PiChurch size={40} />}
        />
        <TouristCard
          title="Explore the"
          subtitle="Discover Extraordinary"
          description="Unlock the Secrets of Cultural Immersion: Embark on a Transformative Travel Journey"
          buttonText="Experience the Excitement"
          bgColor="#006D5B" // Tamno zelena
          buttonColor="#36B37E"
          icon={<GiTreeGrowth size={40} />}
        />
        <TouristCard
          title="Explore the"
          subtitle="Discover the"
          description="Unlock the Secrets of Cultural Immersion: Embark on a Transformative Travel Journey"
          buttonText="Experience the Adventure"
          bgColor="#C4B39A" // Bež boja
          buttonColor="#FF5C5C"
          icon={<GiAncientRuins size={40} />}
        />
      </div>
    </div>
  );
};

export default Categories;
