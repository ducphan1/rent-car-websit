import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../asset/style/Rent-Car-page.css";

const RentCarPage = () => {
  const [carData, setCarData] = useState({
    name: "",
    type: "",
    fuel: "",
    transmission: "",
    capacity: "",
    price: "",
    category: "recommendationCars",
    img: { main: "" },
    thumbnails: ["", "", ""],
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "fuel" && !value.endsWith("L")) {
      formattedValue = `${value}L`;
    } else if (name === "capacity" && !value.toLowerCase().includes("person")) {
      formattedValue = `${value} Person`;
    } else if (name === "price" && !value.endsWith("/day")) {
      formattedValue = `${value}$/day`;
    }

    setCarData((prevData) => ({
      ...prevData,
      [name]: name === "img" ? { main: formattedValue } : formattedValue,
    }));
  };

  const handleThumbnailChange = (index, value) => {
    setCarData((prevData) => {
      const updatedThumbnails = [...prevData.thumbnails];
      updatedThumbnails[index] = value;
      return { ...prevData, thumbnails: updatedThumbnails };
    });
  };

  const handleCategoryChange = (category) => {
    setCarData((prevData) => ({
      ...prevData,
      category,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!carData.img.main) {
      alert("Please provide a valid main image URL.");
      return;
    }

    fetch("https://675bd7cb9ce247eb1937944f.mockapi.io/cars", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(carData),
    })
      .then((response) => response.json())
      .then(() => {
        alert("Car added successfully!");
        navigate("/shop");
      })
      .catch((error) => {
        console.error("Error adding car:", error);
        alert("Failed to add the car. Please try again.");
      });
  };

  return (
    <div className="car-rent-page">
      <h2>ADD NEW CAR</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Car Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={carData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Car Type:</label>
          <input
            type="text"
            id="type"
            name="type"
            value={carData.type}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fuel">Fuel Type (L):</label>
          <input
            type="text"
            id="fuel"
            name="fuel"
            value={carData.fuel}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="transmission">Transmission:</label>
          <input
            type="text"
            id="transmission"
            name="transmission"
            value={carData.transmission}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacity">Capacity (Person):</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            value={carData.capacity}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price (/day):</label>
          <input
            type="text"
            id="price"
            name="price"
            value={carData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Car Main Image URL:</label>
          <input
            type="text"
            id="image"
            name="img"
            value={carData.img.main}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Thumbnails:</label>
          {carData.thumbnails.map((thumbnail, index) => (
            <div key={index} className="thumbnail-input">
              <input
                type="text"
                placeholder={`Thumbnail ${index + 1} URL`}
                value={thumbnail}
                onChange={(e) => handleThumbnailChange(index, e.target.value)}
                required
              />
            </div>
          ))}
        </div>
        <div className="form-group">
          <label>Category:</label>
          <div className="form-button">
            <button
              type="button"
              className={
                carData.category === "recommendationCars" ? "active" : ""
              }
              onClick={() => handleCategoryChange("recommendationCars")}
            >
              Recommendation Cars
            </button>
            <button
              type="button"
              className={carData.category === "popularCars" ? "active" : ""}
              onClick={() => handleCategoryChange("popularCars")}
            >
              Popular Cars
            </button>
          </div>
        </div>
        <button type="submit">Add Car</button>
      </form>
    </div>
  );
};

export default RentCarPage;
