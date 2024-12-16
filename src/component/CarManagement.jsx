import React, { useState, useEffect } from "react";
import axios from "axios";
import "../asset/style/CarManagement.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [editingCar, setEditingCar] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6);
  const [notification, setNotification] = useState("");
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get(
          "https://675bd7cb9ce247eb1937944f.mockapi.io/cars"
        );
        setCars(response.data);
      } catch (error) {
        console.error("Error fetching car data:", error);
      }
    };

    fetchCars();
  }, []);

  const indexOfLastCar = currentPage * carsPerPage;
  const indexOfFirstCar = indexOfLastCar - carsPerPage;
  const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleEditCar = (car) => {
    setEditingCar(car);
  };

  const handleDeleteCar = async (id) => {
    try {
      await axios.delete(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/cars/${id}`
      );
      setCars(cars.filter((car) => car.id !== id));
      setNotification("Car successfully deleted.");
    } catch (error) {
      console.error("Error deleting car:", error);
      setNotification("Failed to delete the car.");
    }
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <div className="car-management">
      <h2>Car Management</h2>
      {editingCar ? (
        <div className="edit-car-form">
          <h3>Edit Car</h3>
        </div>
      ) : (
        <div className="car-list">
          <h3>All Cars</h3>
          <ul>
            {currentCars.map((car) => (
              <li key={car.id}>
                <div>
                  <img src={car.img} alt={car.name} />
                  <h4>{car.name}</h4>
                  <p>{car.type}</p>
                  <p>{car.price}</p>
                </div>
                <button onClick={() => handleEditCar(car)}>Edit</button>
                <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {[...Array(totalPages).keys()].map((number) => (
          <button
            key={number + 1}
            onClick={() => paginate(number + 1)}
            className={currentPage === number + 1 ? "active" : ""}
          >
            {number + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarManagement;
