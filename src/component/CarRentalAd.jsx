import React from "react";
import "../asset/style/CarRental.css";
import { useNavigate } from "react-router-dom";
const CarRentalAds = () => {
  const adData = [
    {
      backgroundColor: "rgba(84, 166, 255, 1)",
      title: "The Best Platform",
      title1: "for Car Rental",
      description: "Ease of doing a car rental safely and",
      description1: "reliably. Of course at a low price.",
      buttonColor: "rgba(53, 99, 233, 1)",
      imageSrc: require("../asset/image/image 7.png"),
    },
    {
      backgroundColor: "rgba(53, 99, 233, 1)",
      title: "Easy way to rent ",
      title1: "a car at a low price",
      description: "Providing cheap car rental services and safe and.",
      description1: "comfortable facilities",
      buttonColor: "rgba(84, 166, 255, 1)",
      imageSrc: require("../asset/image/image 8.png"),
    },
  ];
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/shop");
  };

  return (
    <div className="main-content1">
      {adData.map((ad, index) => (
        <div
          key={index}
          className="adCard"
          style={{ backgroundColor: ad.backgroundColor }}
        >
          <img src={ad.imageSrc} alt="Car rental" className="adImage" />
          <div className="adContent">
            <h2 className="adTitle-ren">{ad.title}</h2>
            <h2 className="adTitle-ren1">{ad.title1}</h2>
            <p className="adDescription">{ad.description}</p>
            <p className="adDescription1">{ad.description1}</p>
            <button
              onClick={handleNavigate}
              className="adButton"
              style={{ backgroundColor: ad.buttonColor }}
            >
              Rental Car
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarRentalAds;
