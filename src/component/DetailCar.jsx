import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStarHalfAlt, faStar } from "@fortawesome/free-solid-svg-icons";
import "../asset/style/DetailCar.css";

const DetailCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getDataById = async (id) => {
    try {
      const response = await fetch(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/cars/${id}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setCar(data);
      setMainImage(data?.img?.main || "https://via.placeholder.com/300");
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Car not found or error occurred.");
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      getDataById(id);
    } else {
      setError("Invalid car ID.");
      setLoading(false);
    }
  }, [id]);

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

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

  return (
    <div className="detail-container">
      <div className="detail-left">
        <div className="main-image-container">
          <img
            src={mainImage}
            alt={car?.name || "Car"}
            className="main-image"
          />
        </div>
        <div className="thumbnail-container">
          {car?.thumbnails?.length > 0 ? (
            car.thumbnails.map((thumbnail, index) => (
              <img
                key={index}
                src={thumbnail}
                alt={`Thumbnail ${index + 1}`}
                className="thumbnail"
                onClick={() => handleThumbnailClick(thumbnail)}
              />
            ))
          ) : (
            <p>No thumbnails available.</p>
          )}
        </div>
      </div>
      <div className="detail-right">
        <h2 className="car-name">
          {car?.name || "Unknown Car"}
          <div className="rating">
            {[...Array(5)].map((_, index) => (
              <FontAwesomeIcon
                key={index}
                icon={index < car?.rating ? faStar : faStarHalfAlt}
                className="star-icon"
              />
            ))}
          </div>
        </h2>
        <p className="description">{car?.description || "No description."}</p>

        <div className="details-grid">
          <p>
            <strong>Type Car:</strong> {car?.type || "N/A"}
          </p>
          <p>
            <strong>Capacity:</strong> {car?.capacity || "N/A"}
          </p>
          <p>
            <strong>Steering:</strong> {car?.transmission || "N/A"}
          </p>
          <p>
            <strong>Fuel:</strong> {car?.fuel || "N/A"}
          </p>
        </div>

        <div className="price-container">
          <div className="price-info">
            <span className="price">{car?.price || "N/A"}</span>
            <span className="price-per-day"></span>
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
