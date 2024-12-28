import React, { useState, useEffect } from "react";
import axios from "axios";
import { styled } from "@mui/material/styles";
import Rating from "@mui/material/Rating";
import { CgSmileSad, CgSmileNeutral } from "react-icons/cg";
import { BiSmile } from "react-icons/bi";
import { FaRegFaceSmileBeam } from "react-icons/fa6";
import { PiSmileyBlankBold } from "react-icons/pi";
import ReviewCard from "../../../components/ReviewCard/ReviewCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
  desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3 },
  tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
  mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
};

const customIcons: Record<number, { icon: JSX.Element; label: string }> = {
  1: {
    icon: <CgSmileSad color="red" size={40} />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <CgSmileNeutral color="orange" size={40} />,
    label: "Dissatisfied",
  },
  3: {
    icon: <PiSmileyBlankBold color="yellow" size={40} />,
    label: "Neutral",
  },
  4: {
    icon: <BiSmile color="green" size={40} />,
    label: "Satisfied",
  },
  5: {
    icon: <FaRegFaceSmileBeam color="green" size={35} />,
    label: "Very Satisfied",
  },
};

type Review = {
  id: number;
  rating: number;
  comment: string;
  createdOn: string;
  createdBy: string;
};
type ReviewsProps = { attractionId: string };

const Reviews: React.FC<ReviewsProps> = ({ attractionId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5241/api/comment?attractionId=${attractionId}`
        );
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [attractionId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `http://localhost:5241/api/comment/${attractionId}`,
        newReview
      );
      setNewReview({ rating: 0, comment: "" });
      setReviews((prevReviews) => [
        ...prevReviews,
        {
          ...newReview,
          id: Date.now(),
          createdOn: new Date().toISOString(),
          createdBy: "You",
        },
      ]);
    } catch (error) {
      console.error("Error posting review:", error);
    }
  };

  return (
    <StyledWrapper>
      <div className="reviews-list">
        <h2>Recenzije</h2>
        <Carousel
          swipeable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          keyBoardControl={true}
          containerClass="carousel-container"
          itemClass="carousel-item-padding-40-px"
        >
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div key={review.id} className="review-card-wrapper">
                <ReviewCard
                  rating={review.rating}
                  title={`Review by ${review.createdBy}`}
                  content={review.comment}
                  date={new Date(review.createdOn).toLocaleDateString()}
                />
              </div>
            ))
          ) : (
            <div className="empty-reviews">
              <p>No reviews yet. Be the first to leave a review!</p>
            </div>
          )}
        </Carousel>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <h2 className="form-title">Ostavite recenziju</h2>
        <div className="rating-container">
          <p className="rating-label">Ocenite svoje iskustvo:</p>
          <Rating
            name="rating"
            value={newReview.rating}
            onChange={(e, value) =>
              setNewReview({ ...newReview, rating: value || 0 })
            }
            IconContainerComponent={({ value }) => {
              const isSelected = value === newReview.rating;
              return (
                <span
                  style={{
                    color: isSelected ? "inherit" : "gray",
                    opacity: isSelected ? 1 : 0.5,
                    transform: isSelected ? "scale(1.2)" : "scale(1)",
                    transition: "all 0.3s ease",
                  }}
                >
                  {customIcons[value]?.icon || <span />}
                </span>
              );
            }}
            getLabelText={(value) => customIcons[value]?.label || ""}
          />
        </div>
        <textarea
          placeholder="Write your review here..."
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          required
        ></textarea>
        <button type="submit" className="submit">
          Submit
        </button>
      </form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")`
  font-family: "Figtree", sans-serif;
  width: 100%;
  padding: 2rem;
  box-sizing: border-box;
  margin-top: 30px;

  .form {
    max-width: 700px;
    margin: 0 auto 2rem;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .reviews-list {
    max-width: 900px;
    margin: 0 auto;
  }
  .form textarea {
    font-family: "Figtree", sans-serif;
    background-color: #fff;
    padding: 0.75rem;
    padding-right: 3rem;
    font-size: 1rem;
    line-height: 1.5rem;
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    outline: none;
  }
  .submit {
    display: block;
    padding: 0.75rem;
    background-color: #e43b39;
    color: #ffffff;
    font-family: "IBM Plex Mono", monospace;
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 500;
    width: 100%;
    max-width: 200px;
    border-radius: 0.5rem;
    text-transform: uppercase;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
    margin: 10px;
  }
  .rating-label {
    padding: 20px;
  }
  .submit:hover {
    background-color: #c2312f;
  }
  .form-title {
    margin: 20px;
    color: #2e2e2d;
  }

  .carousel-container {
    overflow: hidden;
  }

  .carousel-item-padding-40-px {
    padding: 10px;
  }

  .empty-reviews {
    text-align: center;
    padding: 20px;
  }
`;

export default Reviews;
