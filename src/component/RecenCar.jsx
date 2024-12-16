import React from "react";
import CarCard from "./CarCard";
import "../asset/style/CarList.css";
import "../asset/style/RecentCar.css";
import { useNavigate } from "react-router-dom";

import car1 from "../asset/image/car.png";
import car2 from "../asset/image/car1.png";
import car3 from "../asset/image/Car2.png";
import car4 from "../asset/image/Car3.png";

export const popularCars = [
  {
    id: 1,
    name: "Koenigsegg",
    type: "Sport",
    img: car1,
    fuel: "90L",
    transmission: "Manual",
    capacity: "2 People",
    price: "$99.00/day",
    favorite: true,
    description:
      "Koenigsegg redefines the supercar experience with cutting-edge technology, breathtaking speed, and unmatched luxury.",
  },
  {
    id: 2,
    name: "Nissan GT-R",
    type: "Sport",
    img: car2,
    fuel: "80L",
    transmission: "Manual",
    capacity: "2 People",
    price: "$80.00/day",
    favorite: false,
    description:
      "The Nissan GT-R combines raw power with a sophisticated design, delivering an unforgettable driving experience.",
  },
  {
    id: 3,
    name: "Rolls-Royce",
    type: "Sedan",
    img: car3,
    fuel: "70L",
    transmission: "Manual",
    capacity: "4 People",
    price: "$96.00/day",
    favorite: false,
    description:
      "Rolls-Royce offers unparalleled elegance and comfort, perfect for those who value a luxurious ride.",
  },
  {
    id: 4,
    name: "Nissan GT-R",
    type: "Sport",
    img: car4,
    fuel: "80L",
    transmission: "Manual",
    capacity: "2 People",
    price: "$80.00/day",
    favorite: true,
    description:
      "This Nissan GT-R edition boasts enhanced performance, making it a favorite among car enthusiasts worldwide.",
  },
];

const RecentCar = () => {
  const navigate = useNavigate();

  const handleCarClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <div className="car-list-container">
      <section className="popular-cars1">
        <span>
          <h2>Recent Car</h2>
          <button className="view-all-btn"> View All</button>
        </span>
        <div
          className="car-grid"
          style={{ width: "1400px", marginLeft: "50px" }}
        >
          {popularCars.map((car) => (
            <div key={car.id} onClick={() => handleCarClick(car.id)}>
              <CarCard {...car} />
            </div>
          ))}
        </div>
      </section>
      <section className="popular-cars2">
        <span>
          <h2>Recomendation Car</h2>
          <button className="view-all-btn"> View All</button>
        </span>
        <div
          className="car-grid"
          style={{ width: "1400px", marginLeft: "50px" }}
        >
          {popularCars.map((car) => (
            <div key={car.id} onClick={() => handleCarClick(car.id)}>
              <CarCard {...car} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default RecentCar;
