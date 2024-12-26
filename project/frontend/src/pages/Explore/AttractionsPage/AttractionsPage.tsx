import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import Card from "../../../components/Card/Card";
import "./AttractionsPage.css";
type Attraction = {
  id: string;
  name: string;
  description: string;
  photos: string;
};

const AttractionsPage = () => {
  const { search } = useLocation();
  const [attractions, setAttractions] = useState<Attraction[]>([]);

  const queryParams = new URLSearchParams(search);
  const category = queryParams.get("category");

  useEffect(() => {
    const fetchAttractions = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5241/api/tourist_attractions?Category=${category}`
        );
        setAttractions(response.data);
      } catch (error) {
        console.error("Error fetching attractions:", error);
      }
    };

    fetchAttractions();
  }, [category]);

  return (
    <div>
      <div className="attractions_container">
        {attractions.map((attraction) => {
          const [firstPhoto] = attraction.photos.split(",");
          return (
            <Card
              key={attraction.id}
              id={attraction.id}
              image={firstPhoto.trim()}
              title={attraction.name}
              description={attraction.description.slice(0, 60).concat("...")}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AttractionsPage;
