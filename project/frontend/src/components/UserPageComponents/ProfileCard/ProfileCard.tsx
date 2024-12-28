import React, { useContext, useState } from "react";
import styled from "styled-components";
import { FaRegUserCircle, FaPencilAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Modal from "../../Modal/Modal";
import { AppContext } from "../../../context/AppContext";

interface ProfileCardProps {
  userInfo: { userName: string; email: string };
  onUpdateUserName: (newUserName: string) => void;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  userInfo,
  onUpdateUserName,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState(userInfo.userName);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const { setToken, setUserId, setUserRole } = useContext(AppContext);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirmAction = () => {
    if (editedUserName.trim()) {
      onUpdateUserName(editedUserName); // Save the username
    }
    setIsEditing(false);
    setIsModalOpen(false); // Close the modal
    setIsButtonEnabled(false);
    navigate("/");
    setUserId(null);
    setUserRole(null);
    setToken(null);

    localStorage.clear();
  };

  return (
    <>
      <StyledWrapper>
        <div className="card">
          <div className="card__img"></div>
          <div className="card__avatar">
            <FaRegUserCircle size={60} color="gray" />
          </div>
          <div className="card__info">
            <div className="card__title">
              {isEditing ? (
                <input
                  type="text"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  className="card__input"
                  autoFocus
                  onBlur={() => setIsEditing(false)}
                />
              ) : (
                <>
                  {userInfo.userName}
                  <FaPencilAlt
                    className="card__edit-icon"
                    onClick={() => {
                      setIsEditing(true);
                      setIsButtonEnabled(true);
                    }}
                  />
                </>
              )}
            </div>
            <div className="card__subtitle">{userInfo.email}</div>
          </div>
          <div className="card__wrapper">
            <button
              className="card__btn"
              disabled={!isButtonEnabled}
              onClick={handleOpenModal}
            >
              Izmeni
            </button>
          </div>
        </div>
      </StyledWrapper>
      {isModalOpen && (
        <Modal
          title="Da li želite da promenite svoje korisničko ime?"
          description="Ova akcija će zahtevati da se ponovo prijavite."
          actionLabel="Potvrdi"
          onAction={handleConfirmAction}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
};

const StyledWrapper = styled.div`
  .card {
    --main-color: #000;
    --submain-color: #78858f;
    --bg-color: #fff;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
      sans-serif;
    position: relative;
    width: 300px;
    height: 384px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 20px;
    background: var(--bg-color);
  }

  .card__img {
    height: 192px;
    width: 100%;
    background-color: #003333;
  }

  .card__avatar {
    position: absolute;
    width: 114px;
    height: 114px;
    background: var(--bg-color);
    border-radius: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    top: calc(50% - 57px);
  }

  .card__info {
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .card__title {
    font-weight: 500;
    font-size: 18px;
    color: var(--main-color);
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .card__subtitle {
    margin-top: 10px;
    font-weight: 400;
    font-size: 15px;
    color: var(--submain-color);
  }

  .card__input {
    font-size: 18px;
    font-weight: 500;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 5px;
    width: 100px;
  }

  .card__edit-icon {
    cursor: pointer;
    color: var(--submain-color);
    transition: color 0.3s;
  }

  .card__edit-icon:hover {
    color: var(--main-color);
  }

  .card__btn {
    margin-top: 15px;
    width: 76px;
    height: 31px;
    border: 2px solid var(--main-color);
    border-radius: 4px;
    font-weight: 700;
    font-size: 11px;
    color: var(--main-color);
    background: var(--bg-color);
    text-transform: uppercase;
    transition: all 0.3s;
  }

  .card__btn-solid {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn:hover {
    background: var(--main-color);
    color: var(--bg-color);
  }

  .card__btn-solid:hover {
    background: var(--bg-color);
    color: var(--main-color);
  }
`;

export default ProfileCard;
