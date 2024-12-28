import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

type CardProps = {
  image: string; // URL for the image
  title: string;
  description: string;
  id: string;
};

const Card: React.FC<CardProps> = ({ image, title, description, id }) => {
  return (
    <NavLink to={`/attractions/${id}`}>
      <StyledCard>
        <div className="card-content">
          <div
            className="card-image"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="wave-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
              <path
                fill="    #086363"
                fillOpacity="0.7"
                d="M0,0L48,21.3C96,43,192,85,288,96C384,107,480,85,576,112C672,139,768,213,864,224C960,235,1056,181,1152,181.3C1248,181,1344,235,1392,261.3L1440,288L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
              ></path>
            </svg>
          </div>
          <div className="text-content">
            <h2 className="card-title">{title}</h2>
            <p className="card-description">{description}</p>
          </div>
        </div>
      </StyledCard>
    </NavLink>
  );
};

const StyledCard = styled.div`
  width: 350px;
  height: 400px; /* Set a fixed height for the card */
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
&::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5); /* 50% opacity black overlay */
      z-index: 1; /* Ensure it is above the background image */
    }
  }

  .card-content {
    position: relative;
    height: 100%;
  }

  .card-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 0;
  }

  .wave-wrapper {
    position: absolute;
    bottom: 0;
    margin-bottom: -5px;
    left: 0;
    width: 100%;
    z-index: 1;
  }

  .wave {
    width: 100%;
    height: auto;
  }

  .text-content {
    position: relative;
    padding: 16px;
    z-index: 2;
    color: #fff;
    position: absolute;
    bottom: 50px; /* Adjust bottom positioning to be above the wave */
    left: 0;
    right: 0;

    .card-title {
      font-size: 20px;
      margin: 0 0 8px;
      color: #fff;
      background-color: rgba(
        216,
        76,
        71,
        0.8
      ); /* Adjusted to have 80% opacity */
      display: inline; /* Use inline-block to allow the background to only wrap around the text */
      padding: 7px;
    }

    .card-description {
      font-size: 16px;
      color: #fff;
    }
  }
`;

export default Card;
