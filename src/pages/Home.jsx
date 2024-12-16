import React from "react";
import { Route, Routes } from "react-router-dom";
import CarList from "../component/CarList";
import CarRentalAds from "../component/CarRentalAd";
import FormSection from "../component/FormSection";

const HomeContent = () => {
  return (
    <>
      <CarRentalAds />

      <FormSection />

      <CarList />
    </>
  );
};

const Home = () => {
  return (
    <div className="home-page" style={{ backgroundColor: "#F6F7F9" }}>
      <Routes>
        <Route path="/" element={<HomeContent />} />
      </Routes>
    </div>
  );
};

export default Home;
