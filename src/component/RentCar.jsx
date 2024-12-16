import React from "react";
import "../asset/style/RentCar.css";
import { useLocation } from "react-router-dom";

function RentCar() {
  const location = useLocation();
  const carData = location.state || {};
  const { name, img, price, rating, reviews } = carData;

  return (
    <div className="rent-car-container">
      <div className="left-section">
        <div className="section billing-info">
          <h2>Billing Info</h2>
          <p>Please enter your billing info</p>
          <div className="form-group">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Phone Number" />
          </div>
          <div className="form-group">
            <input type="text" placeholder="Address" />
            <input type="text" placeholder="Town / City" />
          </div>
        </div>

        <div className="section rental-info">
          <h2>Rental Info</h2>
          <p>Please select your rental date</p>
          <div className="form-group">
            <div className="rental-option">
              <label>Pick-Up</label>
              <input type="text" placeholder="Select your city" />
              <input type="date" />
              <input type="time" />
            </div>
            <div className="rental-option">
              <label>Drop-Off</label>
              <input type="text" placeholder="Select your city" />
              <input type="date" />
              <input type="time" />
            </div>
          </div>
        </div>

        <div className="section confirmation">
          <button className="rent-now-button">Rent Now</button>
          <p className="data-safe">Your data is safe with us.</p>
        </div>
      </div>

      <div className="right-section rental-summary">
        <h3>Rental Summary</h3>
        {img ? (
          <img
            src={img}
            alt={`${name} car`}
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <p>No image available</p>
        )}

        <div className="summary-details">
          <p>
            <strong>{name || "Car Name"}</strong>
          </p>
          <p>
            ⭐ {rating || "N/A"} ({reviews || "0"}+ Reviewer)
          </p>
          <p>Price per day: {price || "0.00"}</p>
        </div>
        <div className="total-price">Total: {price || "0.00"}</div>
        <button>Proceed to Payment</button>
      </div>
    </div>
  );
}

export default RentCar;
