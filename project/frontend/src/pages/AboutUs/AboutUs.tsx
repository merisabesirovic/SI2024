import React from "react";
import { motion } from "framer-motion";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div className="about-us-container">
      {/* Header Section with animation */}
      <motion.header
        className="header"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <img
          src="https://www.etran.rs/2022/wp-content/uploads/2021/11/LOGO-ZLATO-1.png" // Use your university logo here
          alt="University Logo"
          className="uni-logo"
        />
        <h1 className="titlee">Upoznajte the BoldBlondes tim</h1>
      </motion.header>

      <motion.section
        className="team-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>Naš tim</h2>
        <div className="team-members">
          <div className="team-member">
            <motion.img
              src="https://as2.ftcdn.net/v2/jpg/01/50/14/83/1000_F_150148320_ktvMLsI4CDirhC9zuQ1absp00sMuqmHR.jpg"
              alt="Team Member"
              className="team-member-img"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3>Merisa Beširović</h3>
            <p>Student</p>
          </div>

          <div className="team-member">
            <motion.img
              src="https://as2.ftcdn.net/v2/jpg/01/50/14/83/1000_F_150148320_ktvMLsI4CDirhC9zuQ1absp00sMuqmHR.jpg"
              alt="Team Member"
              className="team-member-img"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            />
            <h3>Aldina Avdić</h3>
            <p>Doc. Dr </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        className="mission-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <p>
          Projekat NP.click rađen je kao deo predmeta Softversko inženjerstvo 1
          na Univerzitetu u Novom Pazaru. Ovaj projekat ima za cilj razvoj
          inovativne platforme koja omogućava lakše istraživanje i pristup
          turističkim atrakcijama u Novom Pazaru. Kroz korišćenje modernih
          tehnologija i pristupačnih korisničkih interfejsa, projekat pruža
          posetiocima i lokalnim korisnicima mogućnost da brzo i jednostavno
          dođu do informacija o istorijskim, kulturnim i prirodnim spomenicima u
          ovom regionu. Projektovani su različiti korisnički nivoi, uključujući
          administratore, turiste, i lokalne firme, čime se omogućava efikasno
          upravljanje sadržajem i interakcija sa posetiocima.
        </p>
      </motion.section>
    </div>
  );
};

export default AboutUs;
