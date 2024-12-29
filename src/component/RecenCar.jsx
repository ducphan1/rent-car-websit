import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import "../asset/style/CarList.css";
import "../asset/style/RecentCar.css";
import { useNavigate } from "react-router-dom";

const RecentCar = () => {
  const [recommendationCars, setRecommendationCars] = useState([]);
  const navigate = useNavigate();

  const fetchRecommendationCars = async () => {
    try {
      const response = await fetch(
        "https://675bd7cb9ce247eb1937944f.mockapi.io/cars"
      );
      const data = await response.json();
      const filteredCars = data.filter(
        (car) => car.category === "recommendationCars"
      );
      setRecommendationCars(filteredCars);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchRecommendationCars();
  }, []);

  const handleCarClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="car-list-container">
      <section className="popular-cars2">
        <span>
          <h2>Recommendation Cars</h2>
          <button className="view-all-btn"> View All</button>
        </span>
        <div
          className="car-grid"
          style={{ width: "1400px", marginLeft: "50px" }}
        >
          {recommendationCars.map((car) => (
            <div key={car.id} onClick={() => handleCarClick(car.id)}>
              <CarCard {...car} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecentCar;
