import React from "react";
import "./CarouselCard.css";

interface CarouselCardProps {
  title: string;
  subtitle: string;
  description: string;
  image?: string;
}

const CarouselCard: React.FC<CarouselCardProps> = ({
  title,
  subtitle,
  description,
  image,
}) => {
  return (
    <div className="carousel-card">
      {image && <img src={image} alt="np" />}
      <h3>{title}</h3>
      <h4>{subtitle}</h4>
      <p>{description}</p>
    </div>
  );
};

export default CarouselCard;
