import React from "react";
import "./App.css";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/Register/RegisterUser/RegisterUser";
import RegisterCompany from "./pages/Register/RegisterCompany/RegisterCompany";
import AdminHomePage from "./pages/AdminPages/AdminHomePage/AdminHomePage";
import UserHomePage from "./pages/UserPages/UserHomePage/UserHomePage";
import ConfirmEmail from "./pages/Register/ConfirmEmail/ConfirmEmail";
import ConfirmLocal from "./pages/Register/ConfirmEmail/ConfirmLocal";
import ForgotPassword from "./pages/Login/ForgotPassword/ForgotPassword";
import ResetPassword from "./pages/Login/ForgotPassword/ResetPassword";
import Explore from "./pages/Explore/Explore";
import AttractionsPage from "./pages/Explore/AttractionsPage/AttractionsPage";
import AttractionDetailsPage from "./pages/Explore/AttractionDetailsPage/AttractionsDetailsPage";
import AllowUsers from "./pages/AdminPages/AllowUsers/AllowUsers";
import CreateAttraction from "./pages/AdminPages/CreateAttraction/CreateAttraction";
import AllAttractions from "./pages/AdminPages/AllAttractions/AllAttractions";
import HomePage from "./pages/LocalCompanyPages/HomePage.tsx/HomePage";
import ScrollToTop from "./components/Helpers/ScrollToTop";
function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Content">
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register_company" element={<RegisterCompany />} />
          <Route path="/register_user" element={<RegisterUser />} />
          <Route path="/admin/all_users" element={<AdminHomePage />} />
          <Route path="/user_home" element={<UserHomePage />} />
          <Route path="/confirm_email" element={<ConfirmEmail />} />
          <Route
            path="/confirm_email_local_company"
            element={<ConfirmLocal />}
          />
          <Route path="/forgot_password" element={<ForgotPassword />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/attractions" element={<AttractionsPage />} />
          <Route path="/attractions/:id" element={<AttractionDetailsPage />} />
          <Route path="/admin/allow_users" element={<AllowUsers />} />
          <Route path="/kreiraj" element={<CreateAttraction />} />
          <Route path="/pregled-atrakcija" element={<AllAttractions />} />
          <Route path="/home_local" element={<HomePage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
