import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import PortfolioFavorites from "../../../components/UserPageComponents/PortfolioFavorites/PortfolioFavorites";
import ProfileCard from "../../../components/UserPageComponents/ProfileCard/ProfileCard";
import Loader from "../../../components/Loader/Loader";
import "./UserHomePage.css";

const UserHomePage = () => {
  const { token, userId } = useContext(AppContext);
  const [userInfo, setUserInfo] = useState({
    userName: "",
    email: "",
    isApproved: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `http://localhost:5241/api/users/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserInfo(response.data);
        setError(null); // Clear any previous error
      } catch (err) {
        setError("Failed to fetch user information.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  const handleUpdateUserName = async (newUserName: string) => {
    try {
      const response = await axios.put(
        `http://localhost:5241/api/users/${userId}`,
        {
          userName: newUserName,
          email: userInfo.email,
          isApproved: userInfo.isApproved,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUserInfo((prev) => ({ ...prev, userName: response.data.userName }));
      setError(null);
    } catch (err) {
      setError("Failed to update username.");
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <Loader />
      </div>
    );
  }

  return (
    <div className="userHome-container">
      <div className="left-userHome">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <PortfolioFavorites />
      </div>
      <div className="card-bg">
        <h2>Vaš Profil</h2>
        <ProfileCard
          userInfo={userInfo}
          onUpdateUserName={handleUpdateUserName}
        />
      </div>
    </div>
  );
};

export default UserHomePage;
