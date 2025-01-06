import { PhotoSharp } from "@mui/icons-material";
import React from "react";
import styled from "styled-components";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";

type FavoritesCardProps = {
  id: string;
  name: string;
  description: string;
  photos: string;
  onDelete: () => void;
};

const FavoritesCard: React.FC<FavoritesCardProps> = ({
  id,
  name,
  description,
  photos,
  onDelete,
}) => {
  return (
    <StyledWrapper>
      <div className="card">
        <img src={photos} className="img" alt="attraction_image" />

        <div className="save">
          <svg
            className="svg"
            width={683}
            height={683}
            viewBox="0 0 683 683"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_993_25)">
              <mask
                id="mask0_993_25"
                style={{ maskType: "luminance" }}
                maskUnits="userSpaceOnUse"
                x={0}
                y={0}
                width={683}
                height={683}
              >
                <path
                  d="M0 -0.00012207H682.667V682.667H0V-0.00012207Z"
                  fill="white"
                />
              </mask>
              <g mask="url(#mask0_993_25)">
                <path
                  d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z"
                  stroke="#CED8DE"
                  strokeWidth={40}
                  strokeMiterlimit={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_993_25">
                <rect width="682.667" height="682.667" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>

        <div className="text">
          <NavLink to={`/attractions/${id}`}>
            <p className="h3">{name} </p>
            <p className="p"> {description.slice(0, 50)}... </p>
          </NavLink>
          <div className="icon-box" onClick={onDelete}>
            <div className="span">
              Ukloni <MdDeleteOutline size={25} color="red" />
            </div>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .card {
    cursor: auto;
    width: 252px;
    height: 400px;
    background: white;
    border-radius: 30px;
    box-shadow: 15px 15px 30px #bebebe, -15px -15px 30px #ffffff;
    transition: 0.2s ease-in-out;
  }

  .img {
    width: 100%;
    height: 50%;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    background: linear-gradient(#e66465, #9198e5);
    display: flex;
    align-items: top;
    justify-content: right;
  }

  .save {
    transition: 0.2s ease-in-out;
    border-radius: 10px;
    width: 30px;
    height: 30px;
    background-color: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .text {
    display: flex;
    flex-direction: column;
    align-items: space-around;
    cursor: pointer;
  }

  .save .svg {
    transition: 0.2s ease-in-out;
    width: 15px;
    height: 15px;
  }

  .icon-box {
    margin-top: 25px;
    width: fit-content;
    padding: 10px;
    background-color: #e3fff9;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: left;
  }

  .icon-box svg {
    width: 17px;
  }

  .text .h3 {
    font-family: Figtree;
    font-size: 15px;
    font-weight: 600;
    color: black;
  }
  .p {
    color: rgb(103, 104, 104);
  }
  .span {
    margin-left: 10px;
    font-family: Figtree;
    font-size: 15px;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: #9198e5;
  }

  .card:hover {
    box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
  }

  .save .svg {
    fill: rgb(103, 104, 104);
  }
`;
export default FavoritesCard;
