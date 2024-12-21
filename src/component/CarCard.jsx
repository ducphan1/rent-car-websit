import React from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faCogs,
  faUsers,
  faHeart,
  faHeartBroken,
} from "@fortawesome/free-solid-svg-icons";
import "../asset/style/CarCard.css";

const CarCard = ({
  id,
  name,
  type,
  img,
  fuel,
  transmission,
  capacity,
  price,
  favorite,
}) => {
  const navigate = useNavigate();

  const handleRentNowClick = () => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="car-card">
      <div className="car-card-header">
        <h3 className="car-name">{name}</h3>
        <span className="car-type">{type}</span>
        <span className="car-favorite">
          <FontAwesomeIcon icon={favorite ? faHeart : faHeartBroken} />
        </span>
      </div>
      <div className="car-image">
        <img src={img?.main} alt={name} />
      </div>
      <div className="car-details">
        <div className="detail">
          <FontAwesomeIcon icon={faGasPump} className="icon" />
          <span>{fuel}</span>
        </div>
        <div className="detail">
          <FontAwesomeIcon icon={faCogs} className="icon" />
          <span>{transmission}</span>
        </div>
        <div className="detail">
          <FontAwesomeIcon icon={faUsers} className="icon" />
          <span>{capacity}</span>
        </div>
      </div>
      <div className="car-card-footer">
        <div className="car-price">{price}</div>
        <button onClick={handleRentNowClick} className="rent-now-btn">
          Rent Now
        </button>
      </div>
    </div>
  );
};

export default CarCard;
