import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CarCard from "../component/CarCard";
import "../asset/style/CarCard.css";

const CarList = () => {
  const [loading, setLoading] = useState(true);
  const [popularCars, setPopularCars] = useState([]);
  const [recommendationCars, setRecommendationCars] = useState([]);
  const [currentPagePopular, setCurrentPagePopular] = useState(1);
  const [currentPageRecommendation, setCurrentPageRecommendation] = useState(1);
  const carsPerPagePopular = 4;
  const carsPerPageRecommendation = 8;
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://675bd7cb9ce247eb1937944f.mockapi.io/cars")
      .then((response) => response.json())
      .then((data) => {
        const popular = data.filter((car) => car.category === "popularCars");
        const recommended = data.filter(
          (car) => car.category === "recommendationCars"
        );

        setPopularCars(popular);
        setRecommendationCars(recommended);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        setLoading(false);
      });
  }, []);

  const paginatePopularCars = () => {
    const startIndex = (currentPagePopular - 1) * carsPerPagePopular;
    const endIndex = currentPagePopular * carsPerPagePopular;
    return popularCars.slice(startIndex, endIndex);
  };

  const paginateRecommendationCars = () => {
    const startIndex =
      (currentPageRecommendation - 1) * carsPerPageRecommendation;
    const endIndex = currentPageRecommendation * carsPerPageRecommendation;
    return recommendationCars.slice(startIndex, endIndex);
  };

  const handleCarClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleNextPagePopular = () => {
    setCurrentPagePopular(currentPagePopular + 1);
  };

  const handlePrevPagePopular = () => {
    setCurrentPagePopular(currentPagePopular - 1);
  };

  const handleNextPageRecommendation = () => {
    setCurrentPageRecommendation(currentPageRecommendation + 1);
  };

  const handlePrevPageRecommendation = () => {
    setCurrentPageRecommendation(currentPageRecommendation - 1);
  };

  return (
    <div className="car-list-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <section className="popular-cars">
            <h2>Popular Cars</h2>
            <div className="car-grid">
              {paginatePopularCars().map((car) => (
                <div key={car.id} onClick={() => handleCarClick(car.id)}>
                  <CarCard {...car} />
                </div>
              ))}
            </div>

            <div className="pagination-controls">
              <button
                onClick={handlePrevPagePopular}
                disabled={currentPagePopular === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPagePopular}
                disabled={
                  currentPagePopular * carsPerPagePopular >= popularCars.length
                }
              >
                Next
              </button>
            </div>
          </section>

          <section className="recommendation-cars">
            <h2 className="recom">Recommendation Cars</h2>
            <div className="car-grid1">
              {paginateRecommendationCars().map((car) => (
                <div key={car.id} onClick={() => handleCarClick(car.id)}>
                  <CarCard {...car} />
                </div>
              ))}
            </div>

            <div className="pagination-controls">
              <button
                onClick={handlePrevPageRecommendation}
                disabled={currentPageRecommendation === 1}
              >
                Previous
              </button>
              <button
                onClick={handleNextPageRecommendation}
                disabled={
                  currentPageRecommendation * carsPerPageRecommendation >=
                  recommendationCars.length
                }
              >
                Next
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
};

export default CarList;
