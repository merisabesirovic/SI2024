import React from "react";
import "./App.css";
import Welcome from "./pages/Welcome/Welcome";
import Login from "./pages/Login/Login";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import RegisterUser from "./pages/Register/RegisterUser/RegisterUser";
import RegisterCompany from "./pages/Register/RegisterCompany/RegisterCompany";
function App() {
  return (
    <div className="App">
      <div className="Navbar">
        <Navbar />
      </div>
      <div className="Content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register_company" element={<RegisterCompany />} />
          <Route path="/register_user" element={<RegisterUser />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
