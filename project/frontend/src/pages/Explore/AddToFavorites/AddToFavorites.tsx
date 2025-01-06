import React from "react";
import axios from "axios";
import { GrFavorite } from "react-icons/gr";
import { styled } from "@mui/material/styles";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

type AddToFavoritesProps = {
  attractionName: string;
};

const AddToFavorites = ({ attractionName }: AddToFavoritesProps) => {
  const handleAddToFavorites = async () => {
    try {
      const response = await axios.post(
        `http://localhost:5241/api/portfolio?name=${encodeURIComponent(
          attractionName
        )}`,
        null,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      toast.success("Uspešno dodato u favorite!");
      console.log(attractionName);
    } catch (error: any) {
      console.log(attractionName);
      const errorMessage =
        error.response?.data || "Došlo je do greške. Pokušajte ponovo.";
      toast.error(errorMessage);
    }
  };

  return (
    <StyledWrapper>
      <div>
        <h1 className="form-title">Već ste bili ovde?</h1>
        <p>
          Ukoliko želite da posetite ovo mesto ponovo, dodajte ga u favorite.
        </p>
        <button className="submit" onClick={handleAddToFavorites}>
          Dodaj {<GrFavorite />}
        </button>
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar
        />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled("div")`
  font-family: "Figtree", sans-serif;
  width: 100%;
  margin-top: 20px;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: beige;

  .submit {
    display: flex;
    justify-content: center;
    align-items: center;
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

  .submit:hover {
    background-color: #c2312f;
  }
  .form-title {
    margin: 20px;
    color: #2e2e2d;
  }
`;

export default AddToFavorites;
