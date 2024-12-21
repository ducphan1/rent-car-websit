import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Input, Form } from "antd";
import "../asset/style/CarManagement.css";

const CarManagement = () => {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(6);
  const [selectedCar, setSelectedCar] = useState(null);
  const [notification, setNotification] = useState("");
  const [category, setCategory] = useState("");

  const [form] = Form.useForm();

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

  const handleModalOpen = (car) => {
    setSelectedCar(car);
    setCategory(car.category);
    form.setFieldsValue({
      ...car,
      img: car.img?.main || "",
      thumbnails: car.thumbnails ? car.thumbnails.slice(0, 3) : ["", "", ""],
    });
  };

  const handleModalClose = () => {
    setSelectedCar(null);
    form.resetFields();
  };

  const handleEditCar = async (values) => {
    try {
      const updatedCar = {
        ...selectedCar,
        ...values,
        img: { main: values.img },
        thumbnails: values.thumbnails.filter((url) => url.trim() !== ""),
        category: category,
      };

      await axios.put(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/cars/${selectedCar.id}`,
        updatedCar
      );

      setCars((prevCars) =>
        prevCars.map((car) => (car.id === selectedCar.id ? updatedCar : car))
      );
      setNotification("Car successfully updated.");
      handleModalClose();
    } catch (error) {
      console.error("Error updating car:", error);
      setNotification("Failed to update the car.");
    }
  };

  const totalPages = Math.ceil(cars.length / carsPerPage);

  return (
    <div className="car-management">
      <h2>Car Management</h2>
      {notification && <p className="notification">{notification}</p>}

      <div className="car-list">
        <h3>All Cars</h3>
        <ul>
          {currentCars.length > 0 ? (
            currentCars.map((car) => (
              <li key={car.id}>
                <div>
                  <img src={car.img.main} alt={car.name} />
                  <h4
                    onClick={() => handleModalOpen(car)}
                    style={{ cursor: "pointer", color: "blue" }}
                  >
                    {car.name}
                  </h4>
                  <p>{car.type}</p>
                  <p>{car.price}</p>
                </div>
              </li>
            ))
          ) : (
            <p>No cars available</p>
          )}
        </ul>
      </div>

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

      <Modal
        title={selectedCar?.name || "Car Details"}
        open={!!selectedCar}
        onCancel={handleModalClose}
        footer={null}
      >
        {selectedCar && (
          <div>
            <div className="category-buttons">
              <Button
                className={category === "recommendationCars" ? "active" : ""}
                onClick={() => setCategory("recommendationCars")}
              >
                Recommended Cars
              </Button>
              <Button
                className={category === "popularCars" ? "active" : ""}
                onClick={() => setCategory("popularCars")}
              >
                Popular Cars
              </Button>
            </div>

            <Form
              form={form}
              layout="vertical"
              onFinish={handleEditCar}
              style={{ marginBottom: "20px" }}
            >
              <Form.Item
                label="Name"
                name="name"
                rules={[{ required: true, message: "Please enter the name" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "Please enter the type" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Fuel" name="fuel">
                <Input />
              </Form.Item>
              <Form.Item label="Transmission" name="transmission">
                <Input />
              </Form.Item>
              <Form.Item label="Capacity" name="capacity">
                <Input />
              </Form.Item>
              <Form.Item label="Price" name="price">
                <Input />
              </Form.Item>
              <Form.Item label="Description" name="description">
                <Input.TextArea rows={3} />
              </Form.Item>
              <Form.Item
                label="Main Image"
                name="img"
                rules={[
                  {
                    required: true,
                    message: "Please enter the main image URL",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="Thumbnails" name="thumbnails">
                <Form.List name="thumbnails">
                  {(fields) => (
                    <div>
                      {fields.map((field, index) => (
                        <Form.Item
                          {...field}
                          key={index}
                          label={`Thumbnail ${index + 1}`}
                        >
                          <Input />
                        </Form.Item>
                      ))}
                    </div>
                  )}
                </Form.List>
              </Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Save Changes
              </Button>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default CarManagement;
