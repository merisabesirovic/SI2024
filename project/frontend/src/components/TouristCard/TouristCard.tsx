import React from "react";
import { useNavigate } from "react-router-dom";
import "./TouristCard.css";

interface TouristCardProps {
  title: string;
  subtitle: string;
  description: string;
  buttonText: string;
  bgColor: string;
  buttonColor: string;
  icon?: React.ReactNode;
  category: string; // New prop for category
}

const TouristCard: React.FC<TouristCardProps> = ({
  title,
  subtitle,
  description,
  buttonText,
  bgColor,
  buttonColor,
  icon,
  category, // Destructure category
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/attractions?category=${category}`);
  };

  return (
    <div className="card" style={{ backgroundColor: bgColor }}>
      <div className="card-content">
        {icon && <div className="card-icon">{icon}</div>}
        <span className="card-subtitle">{subtitle}</span>
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
        <button
          onClick={handleClick}
          className="card-button"
          style={{ backgroundColor: buttonColor }}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default TouristCard;
