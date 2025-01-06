import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "./AttractionsDetailsPage.css";
import { motion } from "framer-motion";
import { FaMapLocationDot } from "react-icons/fa6";
import Reviews from "../Reviews/Reviews";
import { FaPencilAlt } from "react-icons/fa";

import Loader from "../../../components/Loader/Loader";
import AddToFavorites from "../AddToFavorites/AddToFavorites";
import EditModal from "../../../components/Modal/EditModal";
import { AppContext } from "../../../context/AppContext";
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
interface AttractionDetailsPageProps {
  propAttraction?: Attraction | null;

  attractionId?: string;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const AttractionDetailsPage: React.FC<AttractionDetailsPageProps> = ({
  propAttraction,
}) => {
  const { id } = useParams<{ id: string }>();
  const [attraction, setAttraction] = useState<Attraction | null>(
    propAttraction ?? null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 0, lng: 0 });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [category, setCategory] = useState("");
  const { userRole } = useContext(AppContext);
  const adminOrCompany = userRole === "Local_company" || userRole === "Admin";

  useEffect(() => {
    if (!propAttraction) {
      const fetchAttractionDetails = async () => {
        try {
          setIsLoading(true);
          const response = await axios.get(
            `http://localhost:5241/api/tourist_attractions/${id}`
          );
          setAttraction(response.data);
        } catch (error) {
          console.error("Error fetching attraction details:", error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchAttractionDetails();
    } else {
      setIsLoading(false);
    }
  }, [id, propAttraction]);
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error("Error getting user location:", error.message);
      }
    );
  }, []);

  const openEditModal = () => {
    if (attraction) {
      setName(attraction.name);
      setDesc(attraction.description);
      setLongitude(attraction.longitude);
      setLatitude(attraction.latitude);
      setCategory(attraction.category);
      setIsModalOpen(true);
    }
  };
  const calculateAverageRating = (reviews: Array<{ rating: number }>) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return totalRating / reviews.length;
  };

  const handleUpdateAttraction = async () => {
    try {
      const updatedAttraction = {
        id,
        name,
        description,
        longitude,
        latitude,
        category,
      };

      const response = await axios.put(
        `http://localhost:5241/api/tourist_attractions/${propAttraction?.id}`,
        updatedAttraction
      );

      toast.success("Atrakcija uspešno ažurirana!");
      setAttraction(response.data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating attraction:", error);
      toast.error("Došlo je do greške pri ažuriranju atrakcije.");
    }
  };

  if (isLoading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  if (!attraction) {
    return <div>Nema dodatnih informacija o ovoj stranici.</div>;
  }

  const photosArray = attraction.photos.split(",");
  const averageRating = calculateAverageRating(attraction.reviews);
  return (
    <motion.div
      className="attraction-details"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <ToastContainer />

      <div
        className="background-image"
        style={{
          backgroundImage: `url(${photosArray[0]})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
          height: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 1))",
            zIndex: 1,
          }}
        ></div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <motion.p
            className="attraction-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            style={{ fontSize: "2rem", fontWeight: "bold", color: "#000" }}
          >
            {attraction.name}
          </motion.p>
          <p className="description">{attraction.description}</p>
        </div>
      </div>

      {adminOrCompany && (
        <div>
          <button onClick={openEditModal} className="edit-button">
            Uredi Atrakciju <FaPencilAlt size={18} />
          </button>
          <div className="average-rating">
            <h3>
              Prosečna ocena: {averageRating.toFixed(2)}{" "}
              <span className="star-rating">★</span>
            </h3>
          </div>
        </div>
      )}

      {isModalOpen && (
        <EditModal
          title="Izmena Atrakcije"
          name={name}
          description={description}
          longitude={longitude}
          latitude={latitude}
          category={category}
          onSave={handleUpdateAttraction}
          onClose={() => setIsModalOpen(false)}
          setName={setName}
          setDesc={setDesc}
          setLongitude={setLongitude}
          setLatitude={setLatitude}
          setCategory={setCategory}
        />
      )}
      <div className="carousel">
        <Carousel
          swipeable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          keyBoardControl={true}
        >
          {photosArray.map((photo, index) => (
            <div key={index} className="carousel-item">
              <img
                src={photo}
                alt={`Slide ${index}`}
                style={{
                  width: "100%",
                  maxHeight: "300px",
                  objectFit: "cover",
                  marginBottom: "20px",
                }}
              />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="iframe-container">
        <iframe
          className="gmap_iframe"
          src={`https://maps.google.com/maps?&hl=en&q=${attraction.longitude},${attraction.latitude}&t=h&z=12&ie=UTF8&iwloc=near&output=embed`}
          title="Google Map"
        ></iframe>

        <a
          href={`https://www.google.com/maps/dir/${location.lat},${location.lng}/${attraction.longitude},${attraction.latitude}/?entry=ttu`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Prikaži putanju <FaMapLocationDot />
        </a>
      </div>

      <Reviews
        attractionId={id!}
        initialReviews={attraction.reviews}
        showForm={adminOrCompany}
      />
      {adminOrCompany ? (
        <></>
      ) : (
        <AddToFavorites attractionName={attraction.name} />
      )}
    </motion.div>
  );
};
export default AttractionDetailsPage;
