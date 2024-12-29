import React, { useEffect, useState } from "react";
import "../asset/style/RentCarInfo.css";

const RentCarInfo = () => {
  const [rentalData, setRentalData] = useState([]);
  const [carImages, setCarImages] = useState({});
  const [selectedItems, setSelectedItems] = useState([]);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("rentalData")) || [];
    setRentalData(storedData);

    const fetchCarImages = async () => {
      try {
        const response = await fetch(
          "https://675bd7cb9ce247eb1937944f.mockapi.io/cars"
        );
        const cars = await response.json();

        const imageMap = cars.reduce((map, car) => {
          map[car.name] = car.img.main;
          return map;
        }, {});
        setCarImages(imageMap);
      } catch (error) {
        console.error("Failed to fetch car data:", error);
      }
    };

    fetchCarImages();
  }, []);

  const handleCheckboxChange = (index) => {
    setSelectedItems((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index]
    );
  };

  const handleDeleteSelected = () => {
    const updatedData = rentalData.filter(
      (_, index) => !selectedItems.includes(index)
    );
    setRentalData(updatedData);
    setSelectedItems([]);
    localStorage.setItem("rentalData", JSON.stringify(updatedData));
  };

  return (
    <div className="rental-info-section">
      <h2>Rental Information</h2>
      <button
        className="delete-selected-button"
        onClick={handleDeleteSelected}
        disabled={selectedItems.length === 0}
      >
        Delete
      </button>
      {rentalData.length > 0 ? (
        <>
          <div className="rental-info-table">
            {rentalData.map((data, index) => (
              <div key={index} className="rental-entry">
                <div className="rental-header">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(index)}
                    onChange={() => handleCheckboxChange(index)}
                  />
                  <div className="rental-header-item">Car Name</div>
                  <div className="rental-header-item">Price</div>
                  <div className="rental-header-item">Name</div>
                  <div className="rental-header-item">Phone</div>
                  <div className="rental-header-item">Address</div>
                  <div className="rental-header-item">City</div>
                </div>
                <div className="rental-row">
                  <div className="rental-item">
                    {data.carName}
                    <img
                      src={carImages[data.carName] || "default-car.jpg"}
                      alt={`${data.carName}`}
                      className="car-image"
                    />
                  </div>
                  <div className="rental-item">{data.price}</div>
                  <div className="rental-item">{data.name}</div>
                  <div className="rental-item">{data.phone}</div>
                  <div className="rental-item">{data.address}</div>
                  <div className="rental-item">{data.city}</div>
                </div>

                <div className="rental-header-second-row">
                  <div className="rental-header-item">Pickup City</div>
                  <div className="rental-header-item">Pickup Date</div>
                  <div className="rental-header-item">Pickup Time</div>
                  <div className="rental-header-item">Dropoff City</div>
                  <div className="rental-header-item">Dropoff Date</div>
                  <div className="rental-header-item">Dropoff Time</div>
                </div>
                <div className="rental-row-second">
                  <div className="rental-item-second">{data.pickupCity}</div>
                  <div className="rental-item-second">{data.pickupDate}</div>
                  <div className="rental-item-second">{data.pickupTime}</div>
                  <div className="rental-item-second">{data.dropoffCity}</div>
                  <div className="rental-item-second">{data.dropoffDate}</div>
                  <div className="rental-item-second">{data.dropoffTime}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p>No rental data available.</p>
      )}
    </div>
  );
};

export default RentCarInfo;
