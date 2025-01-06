import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import CreateAttraction from "../../AdminPages/CreateAttraction/CreateAttraction";
import Loader from "../../../components/Loader/Loader";
import { AppContext } from "../../../context/AppContext";
import AttractionDetailsPage from "../../Explore/AttractionDetailsPage/AttractionsDetailsPage";
type Attraction = {
  id: string;
  name: string;
  description: string;
  photos: string;
  longitude: string;
  latitude: string;
  category: string;
  reviews: [];
};

const HomePage: React.FC = () => {
  const [hasCreatedAttraction, setHasCreatedAttraction] = useState<
    null | boolean
  >(null);
  const [myAttraction, setMyAttraction] = useState<Attraction | null>(null);
  const { userId } = useContext(AppContext); // Replace with your actual context for logged-in user ID.

  useEffect(() => {
    const fetchUserAttraction = async () => {
      try {
        const response = await axios.get<{
          hasCreatedAttraction: boolean;
          attraction: Attraction | null;
        }>(
          `http://localhost:5241/api/tourist_attractions/myAttraction/${userId}`
        );

        setHasCreatedAttraction(response.data.hasCreatedAttraction);
        setMyAttraction(response.data.attraction);
      } catch (error) {
        console.error("Error fetching user attraction:", error);
        setHasCreatedAttraction(false); // Fallback for unexpected errors
        setMyAttraction(null);
      }
    };

    fetchUserAttraction();
  }, [userId]);

  if (hasCreatedAttraction === null) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <div>
      {hasCreatedAttraction && myAttraction ? (
        <AttractionDetailsPage
          attractionId={myAttraction.id}
          propAttraction={myAttraction}
        />
      ) : (
        <CreateAttraction />
      )}
    </div>
  );
};

export default HomePage;
