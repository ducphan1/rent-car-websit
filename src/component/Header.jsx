import React, { useState, useEffect } from "react";
import "../asset/style/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setLoggedInUser(JSON.parse(user));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    navigate("/");
  };

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const url = new URL("https://675bd7cb9ce247eb1937944f.mockapi.io/cars");
      url.searchParams.append("name", query);

      const response = await fetch(url);
      const data = await response.json();

      const uniqueResults = data.reduce((acc, car) => {
        if (!acc.some((existingCar) => existingCar.id === car.id)) {
          acc.push(car);
        }
        return acc;
      }, []);

      setSearchResults(uniqueResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCarClick = (id) => {
    setSearchQuery("");
    setSearchResults([]);
    navigate(`/detail/${id}`);
  };

  return (
    <header className="header">
      <div className="nav-content">
        <div className="logo-wrapper" onClick={handleLogoClick}>
          <span>MORENT</span>
        </div>

        <nav className="nav-links">
          <a href="/home">Home</a>
          <a href="/shop">Services</a>
          <div className="dropdown">
            <a href="/blog">Blog</a>
            <div className="dropdown-content">
              <a href="/blog/news">News</a>
              <a href="/blog/reviews">Reviews</a>
            </div>
          </div>
          <a href="/cars">Cars</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>

      <div className="header-right">
        <div className="search-wrapper">
          <i className="fas fa-search search-icon" aria-label="Search"></i>
          <input
            type="text"
            placeholder="Search something here"
            aria-label="Search"
            className="search-input"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <i className="fas fa-filter filter-icon" aria-label="Filter"></i>
        </div>

        {searchResults.length > 0 && (
          <div className="search-dropdown">
            {isLoading && <div>Đang tìm kiếm...</div>}
            {searchResults.map((car) => (
              <div
                key={car.id}
                className="dropdown-item"
                onClick={() => handleCarClick(car.id)}
              >
                <div className="car-info">
                  <img src={car.image} alt={car.name} className="car-image" />
                  <div className="car-details">
                    <div className="car-name">{car.name}</div>
                    <div className="car-price">{`Giá thuê: ${car.price} VNĐ`}</div>
                    <div className="car-fuel">{`Xăng tiêu thụ: ${car.fuelConsumption} `}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {loggedInUser ? (
          <div className="notification-wrapper">
            <i className="fas fa-bell bell-icon" aria-label="Notification"></i>
            <div className="dropdown-user">
              <i className="fas fa-user profile-icon" aria-label="Profile"></i>
              <div className="dropdown-user-content">
                {loggedInUser.role === "admin" && <a href="/admin">Admin</a>}
                <a href="/profile">Trang cá nhân</a>
                <a href="/settings">Cài đặt</a>
                <button className="out-button" onClick={handleLogout}>
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="auth-buttons">
            <button
              className="sign-up-btn"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
            <button className="sign-in-btn" onClick={() => navigate("/login")}>
              Sign In
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
