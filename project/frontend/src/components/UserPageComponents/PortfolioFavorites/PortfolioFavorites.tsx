import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import FavoritesCard from "../FavoritesCard/FavoritesCard";
import axios from "axios";
import "./PortfolioFavorites.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Modal from "../../Modal/Modal";
import Loader from "../../Loader/Loader";

type PortfolioItem = {
  id: string;
  name: string;
  description: string;
  photos: string;
};
type Portfolio = PortfolioItem[];

const PortfolioFavorites = () => {
  const { token, userId } = useContext(AppContext);
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedItemName, setSelectedItemName] = useState<string | null>(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    const fetchPortfolio = async () => {
      if (!token || !userId) return;

      try {
        const response = await axios.get(
          `http://localhost:5241/api/portfolio`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        setPortfolio(response.data);
        console.log(response.data);
      } catch (error: any) {
        setError(error?.message || "Failed to fetch portfolio");
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [token, userId]);

  const handleDelete = async () => {
    if (!selectedItemName || !token) return;

    try {
      await axios.delete(`http://localhost:5241/api/portfolio`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: selectedItemName,
        },
      });

      setPortfolio((prev) =>
        prev ? prev.filter((item) => item.name !== selectedItemName) : prev
      );
      setModalOpen(false);
    } catch (error: any) {
      console.error("Error deleting portfolio item:", error);
    }
  };

  if (loading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="favs">
      <h2>Mesta koja ste sačuvali u listu omiljeni</h2>
      <Carousel
        swipeable={true}
        showDots={true}
        responsive={responsive}
        ssr={true}
        arrows={true}
        infinite={true}
        keyBoardControl={true}
        containerClass="carousel-container"
        itemClass="carousel-item-padding-40-px"
      >
        {portfolio && portfolio.length > 0 ? (
          portfolio.map((item) => {
            const [firstPhoto] = item.photos.split(",");
            return (
              <div key={item.id} className="carousel-item">
                <FavoritesCard
                  key={item.id}
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  photos={firstPhoto}
                  onDelete={() => {
                    setSelectedItemName(item.name);
                    setModalOpen(true);
                  }}
                />
              </div>
            );
          })
        ) : (
          <p style={{ width: "700px" }}>Vaša lista omiljenih je prazna.</p>
        )}
      </Carousel>
      {modalOpen && (
        <Modal
          onAction={handleDelete}
          actionLabel="Izbrisi"
          onClose={() => setModalOpen(false)}
          title="Potvrda brisanja"
          description="Da li ste sigurni da želite ukloniti iz svoje liste omiljenih?"
        />
      )}
    </div>
  );
};

export default PortfolioFavorites;
