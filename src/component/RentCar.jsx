import React, { useState } from "react";
import "../asset/style/RentCar.css";
import { useLocation } from "react-router-dom";

function RentCar({ onAddRental = () => {} }) {
  const location = useLocation();
  const carData = location.state || {};
  const {
    name = "Unknown Car",
    img = {},
    price = "0.00",
    rating = "N/A",
    reviews = 0,
  } = carData;

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pickupCity: "",
    pickupDate: "",
    pickupTime: "",
    dropoffCity: "",
    dropoffDate: "",
    dropoffTime: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const requiredFields = [
      "name",
      "phone",
      "pickupCity",
      "pickupDate",
      "pickupTime",
      "dropoffCity",
      "dropoffDate",
      "dropoffTime",
    ];
    for (const field of requiredFields) {
      if (!formData[field]) {
        setError(
          `Please fill out the ${field
            .replace(/([A-Z])/g, " $1")
            .toLowerCase()} field.`
        );
        return false;
      }
    }
    setError("");
    return true;
  };

  const handleProceedToPayment = () => {
    if (!validateForm()) return;

    const rental = {
      ...formData,
      carName: name,
      price,
    };

    const storedData = JSON.parse(localStorage.getItem("rentalData")) || [];

    if (!Array.isArray(storedData)) {
      console.error("Corrupted data in localStorage. Resetting rentalData.");
      localStorage.setItem("rentalData", JSON.stringify([]));
    }

    const updatedRentalData = [...storedData, rental];

    localStorage.setItem("rentalData", JSON.stringify(updatedRentalData));

    onAddRental(updatedRentalData);

    setIsModalOpen(true);
  };

  return (
    <div className="rent-car-container">
      <div className="left-section">
        <div className="section billing-info">
          <h2>Billing Info</h2>
          <p>Please enter your billing info</p>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="city"
              placeholder="Town / City"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="section rental-info">
          <h2>Rental Info</h2>
          <p>Please select your rental date</p>
          <div className="form-group">
            <div className="rental-option">
              <label>Pick-Up</label>
              <input
                type="text"
                name="pickupCity"
                placeholder="Select your city"
                value={formData.pickupCity}
                onChange={handleChange}
              />
              <input
                type="date"
                name="pickupDate"
                value={formData.pickupDate}
                onChange={handleChange}
              />
              <input
                type="time"
                name="pickupTime"
                value={formData.pickupTime}
                onChange={handleChange}
              />
            </div>
            <div className="rental-option">
              <label>Drop-Off</label>
              <input
                type="text"
                name="dropoffCity"
                placeholder="Select your city"
                value={formData.dropoffCity}
                onChange={handleChange}
              />
              <input
                type="date"
                name="dropoffDate"
                value={formData.dropoffDate}
                onChange={handleChange}
              />
              <input
                type="time"
                name="dropoffTime"
                value={formData.dropoffTime}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="section confirmation">
          <button className="rent-now-button" onClick={handleProceedToPayment}>
            Proceed to Payment
          </button>
        </div>
      </div>

      <div className="right-section rental-summary">
        <h3>Rental Summary</h3>
        {img?.main ? (
          <img
            src={img.main}
            alt={`${name} car`}
            onError={(e) => (e.target.style.display = "none")}
          />
        ) : (
          <p>No image available</p>
        )}

        <div className="summary-details">
          <p>
            <strong>{name}</strong>
          </p>
          <p>
            ⭐ {rating} ({reviews}+ Reviews)
          </p>
          <p>Price per day: {price}</p>
        </div>
        <div className="total-price">Total: {price}</div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Booking Successful!</h2>
            <p>Your car rental has been successfully booked.</p>
            <p>
              Thank you for booking the <strong>{name}</strong>.
            </p>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default RentCar;
