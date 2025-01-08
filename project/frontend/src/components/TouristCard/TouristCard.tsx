import React from "react";
import "./TouristCard.css";

type TouristCardProps = {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  bgColor: string;
  buttonColor: string;
  icon: React.ReactNode;
  category: string;
  onClick: () => void;
};

const TouristCard = ({
  title,
  subtitle,
  description,
  buttonText,
  bgColor,
  buttonColor,
  icon,
  onClick,
}: TouristCardProps) => {
  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <div className="card-content">
        {icon && <div className="card-icon">{icon}</div>}
        <span className="card-subtitle">{subtitle}</span>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button
          className="card-button"
          style={{ backgroundColor: buttonColor }}
          onClick={(e) => {
            e.stopPropagation(); // Prevents click from bubbling to the card container
            onClick();
          }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TouristCard;
