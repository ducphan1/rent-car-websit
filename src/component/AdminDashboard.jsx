import React, { useState, useEffect } from "react";
import RentCarPage from "./RentCarPage";
import CarManagement from "./CarManagement";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCar,
  faUsers,
  faChartPie,
  faGasPump,
  faInbox,
  faCalendar,
  faCog,
  faQuestionCircle,
  faMoon,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../asset/style/AdminDashboard.css";

const AdminDashboard = ({ setShowFormSection }) => {
  const [popularCarData, setPopularCarData] = useState([]);
  const [activePage, setActivePage] = useState("dashboard");

  useEffect(() => {
    const fetchCarData = async () => {
      try {
        const response = await axios.get(
          "https://675bd7cb9ce247eb1937944f.mockapi.io/cars"
        );
        setPopularCarData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCarData();
  }, []);

  const DashboardPage = () => (
    <div className="main-content">
      <section className="map-section">
        <h3>Rental Locations</h3>
        <div className="map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.835434509254!2d144.9537363156933!3d-37.81720974202244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf577ec8b8a717c!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1610410654774!5m2!1sen!2sau"
            title="Rental Locations Map"
            width="100%"
            height="300"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
      </section>
      <div className="top-row">
        <section className="details-rental1">
          <h2>Details Rental</h2>
          {popularCarData.length > 0 ? (
            <div className="rental-card1">
              <img
                src={popularCarData[0].img}
                alt={popularCarData[0].name}
                className="car-image"
              />
              <div className="rental-info1">
                <h3>{popularCarData[0].name}</h3>
                <p>{popularCarData[0].type}</p>
              </div>
            </div>
          ) : (
            <p>No rental data available</p>
          )}
          <div className="total-price1">
            <p>Total Rental Price</p>
            <h4>Overall price and includes rental discount</h4>
            <h3>$80.00</h3>
          </div>
        </section>
        <section className="chart-section">
          <h3>Top 5 Car Rentals</h3>
          <div className="chart">
            <div className="chart-graphic">
              <FontAwesomeIcon icon={faChartPie} size="6x" color="#4e89ff" />
            </div>
            <ul>
              <li style={{ color: "#4e89ff" }}>Sport Car - 17,439</li>
              <li style={{ color: "#ff4d4d" }}>SUV - 9,478</li>
              <li style={{ color: "#ffa500" }}>Coupe - 18,197</li>
              <li style={{ color: "#4caf50" }}>Hatchback - 12,510</li>
              <li style={{ color: "#800080" }}>MPV - 14,406</li>
            </ul>
          </div>
        </section>
      </div>
      <section className="recent-transactions1">
        <h3>Recent Transactions</h3>
        <ul>
          {popularCarData.slice(0, 4).map((car) => (
            <li key={car.id} className="transaction-item">
              <img src={car.img} alt={car.name} />
              <div>
                <h4>{car.name}</h4>
                <p>{car.type}</p>
                <p>{car.price}</p>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );

  return (
    <div className="admin-dashboard">
      <aside className="sidebar">
        <nav className="menu">
          <ul>
            <li
              className={activePage === "dashboard" ? "active" : ""}
              onClick={() => {
                setActivePage("dashboard");
                setShowFormSection(true);
              }}
            >
              <FontAwesomeIcon icon={faChartPie} className="menu-icon" />
              Dashboard
            </li>
            <li
              className={activePage === "carRent" ? "active" : ""}
              onClick={() => {
                setActivePage("carRent");
                setShowFormSection(false);
              }}
            >
              <FontAwesomeIcon icon={faCar} className="menu-icon" />
              Car Rent
            </li>
            <li
              className={activePage === "carManagement" ? "active" : ""}
              onClick={() => {
                setActivePage("carManagement");
                setShowFormSection(false);
              }}
            >
              <FontAwesomeIcon icon={faCar} className="menu-icon" />
              Car Management
            </li>
            <li>
              <FontAwesomeIcon icon={faUsers} className="menu-icon" />
              Insight
            </li>
            <li>
              <FontAwesomeIcon icon={faGasPump} className="menu-icon" />
              Reimburse
            </li>
            <li>
              <FontAwesomeIcon icon={faInbox} className="menu-icon" />
              Inbox
            </li>
            <li>
              <FontAwesomeIcon icon={faCalendar} className="menu-icon" />
              Calendar
            </li>
          </ul>
        </nav>
        <div className="preferences">
          <p>Preferences</p>
          <ul>
            <li>
              <FontAwesomeIcon icon={faCog} className="menu-icon" />
              Settings
            </li>
            <li>
              <FontAwesomeIcon icon={faQuestionCircle} className="menu-icon" />
              Help & Center
            </li>
            <li>
              <FontAwesomeIcon icon={faMoon} className="menu-icon" />
              Dark Mode
            </li>
          </ul>
        </div>
        <button className="logout">
          <FontAwesomeIcon icon={faSignOutAlt} className="menu-icon" />
          Log Out
        </button>
      </aside>
      <main className="main-content">
        {activePage === "carRent" ? (
          <RentCarPage />
        ) : activePage === "carManagement" ? (
          <CarManagement />
        ) : (
          <DashboardPage />
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
