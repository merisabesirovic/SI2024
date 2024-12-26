import React from "react";
import styled from "styled-components";
import { CgProfile } from "react-icons/cg";

type ReviewCardProps = {
  title: string;
  content: string;
  date: string;
  rating: number;
};

const ReviewCard: React.FC<ReviewCardProps> = ({
  title,
  content,
  date,
  rating,
}) => {
  return (
    <StyledWrapper>
      <div className="reviewcard">
        <CgProfile size={40} />
        <h3 className="card__title">{title}</h3>
        <p className="card__content">{content}</p>
        <p className="card__rate">{`Ocena (${rating})`}</p>
        <div className="card__date">{date}</div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .reviewcard {
    --border-radius: 0.75rem;
    --primary-color: rgb(250, 87, 106);
    --secondary-color: rgb(87, 59, 64);
    width: 210px;

    border-radius: var(--border-radius);
    background: #f1f1f3;
    box-shadow: 0px 8px 16px 0px rgb(0 0 0 / 3%);
    position: relative;
    min-height: 200px;
    margin: 30px;
    padding: 10px;
  }

  .reviewcard .card__content {
    color: var(--secondary-color);
    font-size: 0.9rem;
    margin-bottom: 20px;
  }

  .reviewcard .card__title {
    padding: 15px;
    font-size: 1.3rem;
    font-weight: bold;
    color: rgb(87, 59, 64);
  }
  .reviewcard .card__rate {
    padding: 10px;
  }

  .reviewcard .card__date {
    color: rgb(199, 157, 164);
    font-size: 0.8rem;
  }
`;

export default ReviewCard;
