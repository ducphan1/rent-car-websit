import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../asset/style/DetailCar.css";

const DetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataById = (id) => {
    console.log(`Fetching car with ID: ${id}`);
    fetch(`https://675bd7cb9ce247eb1937944f.mockapi.io/cars/${id}`)
      .then((response) => {
        console.log("Response status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Car data fetched:", data);
        setCar(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching car data:", err);
        setError("Car not found or error occurred.");
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      getDataById(id);
    } else {
      console.error("Car ID is undefined");
      setError("Invalid car ID.");
      setLoading(false);
    }
  }, [id]);

  const handleRentNow = () => {
    if (car) {
      navigate("/rent-car", {
        state: { ...car },
      });
    }
  };

  if (loading) {
    return <div>Loading car details...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!car) {
    return <h2>Car not found</h2>;
  }

  return (
    <div className="detail-container">
      <div className="detail-left">
        <div className="main-image-container">
          <img src={car.img} alt={car.name} className="main-image" />
        </div>
        <div className="thumbnail-container">
          <img src={car.img} alt={car.name} className="thumbnail" />
          <img src={car.img} alt={car.name} className="thumbnail" />
          <img src={car.img} alt={car.name} className="thumbnail" />
        </div>
      </div>

      <div className="detail-right">
        <div className="header1">
          <h2>{car.name}</h2>
          <i className="fas fa-heart favorite-icon"></i>
        </div>
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <i
              key={i}
              className={`fas fa-star ${
                i < car.rating ? "star-icon" : "star-icon inactive"
              }`}
            ></i>
          ))}
          <span>{car.reviewer} Reviewer</span>
        </div>
        <p className="description">{car.description}</p>
        <div className="car-details">
          <p>
            Type Car: <span>{car.type}</span>
          </p>
          <p>
            Capacity: <span>{car.capacity}</span>
          </p>
        </div>
        <div className="car-details">
          <p>
            Steering: <span>{car.transmission}</span>
          </p>
          <p style={{ marginRight: "37px" }}>
            Gasoline: <span>{car.fuel}</span>
          </p>
        </div>
        <div className="price-container">
          <div>
            <span className="price">{car.price}</span>
            <span className="original-price">{car.originalPrice}</span>
          </div>
          <button className="btn-rent" onClick={handleRentNow}>
            Rent Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailCar;
