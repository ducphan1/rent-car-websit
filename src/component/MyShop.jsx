import React, { useEffect, useState } from "react";
import CarCard from "./CarCard";
import Filter from "../component/filter";
import "../asset/style/MyShop.css";

const ITEMS_PER_PAGE = 8;
const POPULAR_ITEMS_PER_PAGE = 4;

const MyShop = () => {
  const [loading, setLoading] = useState(true);
  const [popularCars, setPopularCars] = useState([]);
  const [recommendationCars, setRecommendationCars] = useState([]);
  const [filteredRecommendationCars, setFilteredRecommendationCars] = useState(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);

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
        setFilteredRecommendationCars(recommended);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching car data:", error);
        setLoading(false);
      });
  }, []);

  const paginate = (cars, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    return cars.slice(startIndex, endIndex);
  };

  const totalRecommendationPages = Math.ceil(
    filteredRecommendationCars.length / ITEMS_PER_PAGE
  );

  const handleFilterChange = (filteredCars) => {
    setFilteredRecommendationCars(filteredCars);
    setCurrentPage(1);
  };

  return (
    <div className="car-list-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Filter
            onFilterChange={handleFilterChange}
            recommendationCars={recommendationCars}
          />

          <section className="popular-cars">
            <h2>Popular Cars</h2>
            <div className="car-grid">
              {paginate(popularCars, POPULAR_ITEMS_PER_PAGE).map((car) => (
                <div key={car.id}>
                  <CarCard {...car} />
                </div>
              ))}
            </div>
          </section>

          <section className="recommendation-cars">
            <h2 className="recom">Recommendation Cars</h2>
            <div className="car-grid1">
              {paginate(filteredRecommendationCars, ITEMS_PER_PAGE).map(
                (car) => (
                  <div key={car.id}>
                    <CarCard {...car} />
                  </div>
                )
              )}
            </div>

            <div className="pagination">
              {Array.from({ length: totalRecommendationPages }, (_, index) => (
                <button
                  key={index}
                  className={currentPage === index + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default MyShop;
