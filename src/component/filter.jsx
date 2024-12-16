import React, { useState, useEffect } from "react";
import "../asset/style/Filter.css";

const Filter = ({ onFilterChange, recommendationCars }) => {
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedCapacities, setSelectedCapacities] = useState([]);
  const [selectedFuels, setSelectedFuels] = useState([]);
  const [price, setPrice] = useState(1000);
  const [typeCounts, setTypeCounts] = useState({});
  const [capacityCounts, setCapacityCounts] = useState({});
  const [fuelCounts, setFuelCounts] = useState({});
  useEffect(() => {
    if (recommendationCars && recommendationCars.length > 0) {
      filterCars([], [], [], 1000);
    }
  }, [recommendationCars]);

  useEffect(() => {
    const typeCount = {};
    const capacityCount = {};
    const fuelCount = {};

    recommendationCars.forEach((car) => {
      typeCount[car.type] = (typeCount[car.type] || 0) + 1;
      capacityCount[car.capacity] = (capacityCount[car.capacity] || 0) + 1;
      fuelCount[car.fuel] = (fuelCount[car.fuel] || 0) + 1;
    });

    setTypeCounts(typeCount);
    setCapacityCounts(capacityCount);
    setFuelCounts(fuelCount);

    filterCars(selectedTypes, selectedCapacities, selectedFuels, price);
  }, [recommendationCars]);

  useEffect(() => {
    filterCars(selectedTypes, selectedCapacities, selectedFuels, price);
  }, [selectedTypes, selectedCapacities, selectedFuels, price]);

  useEffect(() => {
    filterCars([], [], [], price);
  }, []);

  const handleTypeChange = (type) => {
    const updatedTypes = selectedTypes.includes(type)
      ? selectedTypes.filter((t) => t !== type)
      : [...selectedTypes, type];

    setSelectedTypes(updatedTypes);
  };

  const handleCapacityChange = (capacity) => {
    const updatedCapacities = selectedCapacities.includes(capacity)
      ? selectedCapacities.filter((c) => c !== capacity)
      : [...selectedCapacities, capacity];

    setSelectedCapacities(updatedCapacities);
  };

  const handleFuelChange = (fuel) => {
    const updatedFuels = selectedFuels.includes(fuel)
      ? selectedFuels.filter((f) => f !== fuel)
      : [...selectedFuels, fuel];

    setSelectedFuels(updatedFuels);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const filterCars = (types, capacities, fuels, maxPrice) => {
    const filtered = recommendationCars.filter((car) => {
      const isTypeMatch = types.length === 0 || types.includes(car.type);
      const isCapacityMatch =
        capacities.length === 0 || capacities.includes(car.capacity);
      const isFuelMatch =
        fuels.length === 0 ||
        fuels.some((fuel) => parseInt(fuel) >= parseInt(car.fuel));
      const isPriceMatch = car.price <= maxPrice;

      return isTypeMatch && isCapacityMatch && isFuelMatch && isPriceMatch;
    });

    onFilterChange(filtered);
  };

  return (
    <div className="filter-container">
      <div className="filter-section">
        <h4>Type</h4>
        {["Sport", "SUV", "MPV", "Sedan", "Coupe", "Hatchback"].map(
          (type, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`type-${type}`}
                checked={selectedTypes.includes(type)}
                onChange={() => handleTypeChange(type)}
              />
              <label htmlFor={`type-${type}`}>
                {type} <span>({typeCounts[type] || 0})</span>{" "}
              </label>
            </div>
          )
        )}
      </div>

      <div className="filter-section">
        <h4>Capacity</h4>
        {["2 Person", "4 Person", "6 Person", "8 or More"].map(
          (capacity, index) => (
            <div key={index} className="filter-item">
              <input
                type="checkbox"
                id={`capacity-${capacity}`}
                checked={selectedCapacities.includes(capacity)}
                onChange={() => handleCapacityChange(capacity)}
              />
              <label htmlFor={`capacity-${capacity}`}>
                {capacity} <span>({capacityCounts[capacity] || 0})</span>{" "}
              </label>
            </div>
          )
        )}
      </div>

      <div className="filter-section">
        <h4>Fuel</h4>
        {["70L", "80L", "90L"].map((fuel, index) => (
          <div key={index} className="filter-item">
            <input
              type="checkbox"
              id={`fuel-${fuel}`}
              checked={selectedFuels.includes(fuel)}
              onChange={() => handleFuelChange(fuel)}
            />
            <label htmlFor={`fuel-${fuel}`}>
              {fuel} <span>({fuelCounts[fuel] || 0})</span>
            </label>
          </div>
        ))}
      </div>

      <div className="filter-section">
        <h4>Price</h4>
        <div className="price-slider">
          <input
            type="range"
            min="0"
            max="1000"
            value={price}
            onChange={handlePriceChange}
          />
          <p>Max. ${price}.00</p>
        </div>
      </div>
    </div>
  );
};

export default Filter;
