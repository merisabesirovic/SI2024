import React from "react";
import "./Explore.css";
import { PiMosque } from "react-icons/pi";
import { PiChurch } from "react-icons/pi";
import { GiAncientRuins, GiTreeGrowth } from "react-icons/gi";
import { FaHotel, FaUtensils, FaCoffee } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type CategoryCardProps = {
  title: string;
  backgroundImage: string;
  icon: React.ReactNode;
  description: string;
  bgColor: string;
  onClick: () => void;
};

const CategoryCard = ({
  title,
  backgroundImage,
  icon,
  description,
  bgColor,
  onClick,
}: CategoryCardProps) => {
  return (
    <div
      className="category-card"
      onClick={onClick} // Attach the onClick handler
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundColor: bgColor,
        cursor: "pointer", // Indicate clickability
      }}
    >
      <div className="overlay">
        <div className="icon">{icon}</div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
};

const Explore = () => {
  const navigate = useNavigate();

  const categories = [
    {
      title: "Islamski spomenici",
      backgroundImage: "/images/islamic.jpg",
      icon: <PiMosque size={50} />,
      description: "Otkrijte lepote islamske athitekture.",
      bgColor: "#003333",
      query: "islamic",
    },
    {
      title: "Hrišćanski spomenici",
      backgroundImage: "/images/christian.jpg",
      icon: <PiChurch size={50} />,
      description: "Istražite jedne od prvih srpskih pravoslavnih crkava.",
      bgColor: "#D84C47",
      query: "christian",
    },
    {
      title: "Istorijski spomenici",
      backgroundImage: "/images/historic.jpg",
      icon: <GiAncientRuins size={50} />,
      description: "Vratite se korak u prošlost sa spoemincima kulture.",
      bgColor: "#C4B39A",
      query: "historic",
    },
    {
      title: "Prirodne lepote",
      backgroundImage: "/images/natural.jpg",
      icon: <GiTreeGrowth size={50} />,
      description:
        "Spojite se sa prirodom na lokacijama koje će vas oduševiti.",
      bgColor: "#006D5B",
      query: "natural",
    },
    {
      title: "Hoteli",
      backgroundImage: "/images/hotel.jpg",
      icon: <FaHotel size={50} />,
      description: "Opustite se i uživajte u luksuznim hotelima.",
      bgColor: "#8B4513",
      query: "hotel",
    },
    {
      title: "Restorani",
      backgroundImage: "/images/restaurant.jpg",
      icon: <FaUtensils size={50} />,
      description: "Probajte ukuse prave tradicionalne kuhinje.",
      bgColor: "#FF5C5C",
      query: "restaurants",
    },
    {
      title: "Kafići",
      backgroundImage: "/images/cafe.jpg",
      icon: <FaCoffee size={50} />,
      description: "Osetite dušu Novog Pazara kroz kafiće.",
      bgColor: "#A0522D",
      query: "cafe",
    },
  ];

  return (
    <div className="explore-container">
      <div className="categories-grid">
        {categories.map((category, index) => (
          <CategoryCard
            key={index}
            title={category.title}
            backgroundImage={category.backgroundImage}
            icon={category.icon}
            description={category.description}
            bgColor={category.bgColor}
            onClick={() => navigate(`/attractions?category=${category.query}`)} // Pass onClick handler
          />
        ))}
      </div>
      <div className="text-right">
        <h1 className="explore-title">Otkrijte čari Novog Pazara</h1>
        <p>
          Novi Pazar, smešten u srcu Sandžaka, predstavlja pravo blago za
          ljubitelje kulture, istorije i prirodnih lepota. Grad poznat po svojoj
          raznolikosti nudi jedinstvenu priliku da istražite znamenitosti poput
          srednjovekovnih crkava, veličanstvenih džamija, ali i prirodnih oaza
          koje okružuju grad. Svaka kategorija atrakcija priča svoju priču – od
          arhitektonskih dragulja iz doba Nemanjića do mirnih planinskih pejzaža
          savršenih za odmor. Bilo da ste ljubitelj istorije, prirode ili
          autentičnih kulinarskih specijaliteta, Novi Pazar ima nešto za
          svakoga.
        </p>
        <h1 className="explore-title">Malo o istoriji</h1>
        <p>
          Osnivač Novog Pazara je Isa-beg Ishaković koji je sredinom XV veka
          podigao grad u neposrednoj blizini srednjovjekovnog naselja Trgovište,
          poznatog pod imenom Ras. Lociran na ravničarskom prostoru usred
          Novopazarskog polja, Novi Pazar je prvobitno bio zamišljen kao baza za
          dalje prodore Osmanlija na sever.<br></br> <br /> Između 1459. i 1461.
          udareni su temelje gradu na ušću Jošanice i Raške i dali mu ime Yeni
          Bazar, odnosno Novi Pazar. Preko njega su prolazili važni putevi koji
          su povezivali Dubrovnik, Bosnu i južno primorje sa Solunom i
          Carigradom. Od samog nastanka grad je imao fizionomiju orijentalnog
          naselja, a zbog svoje veličine i značaja nazvan je šeherom, što je bio
          epitet koji je nosilo malo gradova na Balkanu. U sredini se nalazila
          čaršija sa dućanima zanatlija i trgovaca.
        </p>
      </div>
    </div>
  );
};

export default Explore;
