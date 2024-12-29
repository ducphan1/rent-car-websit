import React, { useState, useEffect } from "react";
import "../asset/style/Header.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { useNavigate } from "react-router-dom";

const DEFAULT_AVATAR_URL =
  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png";

const Header = () => {
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [avatar, setAvatar] = useState(DEFAULT_AVATAR_URL);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const user = localStorage.getItem("user");
        if (user) {
          const userData = JSON.parse(user);
          setLoggedInUser(userData);
          setIsFetching(true);
          await fetchAvatar(userData.id);
          setIsFetching(false);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const fetchAvatar = async (userId) => {
    try {
      const response = await fetch(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/user/${userId}`
      );
      if (!response.ok) throw new Error("Failed to fetch user avatar");

      const data = await response.json();
      const isMockAPIAvatar =
        data.avatar && data.avatar.includes("cloudflare-ipfs");

      if (!data.avatar || isMockAPIAvatar) {
        await updateAvatarOnMockAPI(userId, DEFAULT_AVATAR_URL);
        setAvatar(DEFAULT_AVATAR_URL);
      } else {
        setAvatar(data.avatar);
      }
    } catch (error) {
      console.error("Error fetching user avatar:", error);
      setAvatar(DEFAULT_AVATAR_URL);
    }
  };

  const updateAvatarOnMockAPI = async (userId, avatarUrl) => {
    try {
      const response = await fetch(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/user/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ avatar: avatarUrl }),
        }
      );

      if (!response.ok) throw new Error("Failed to update avatar on MockAPI");

      const updatedUser = await response.json();
      if (updatedUser.avatar !== avatarUrl) {
        console.warn(
          "Avatar URL was modified by MockAPI. Resetting to default."
        );
        setAvatar(DEFAULT_AVATAR_URL);
      } else {
        setAvatar(updatedUser.avatar);
      }

      console.log("Avatar updated successfully on MockAPI");
    } catch (error) {
      console.error("Error updating avatar on MockAPI:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setLoggedInUser(null);
    setAvatar(DEFAULT_AVATAR_URL);
    navigate("/");
  };

  const handleLogoClick = () => navigate("/");

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
      if (!response.ok) throw new Error("Failed to fetch search results");

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
      setSearchResults([]);
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
          <a href="/">Home</a>
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
                  <img
                    src={car.img.main}
                    alt={car.name}
                    className="car-image"
                  />
                  <div className="car-details">
                    <div className="car-name">{car.name}</div>
                    <div className="car-price">{`Giá thuê: ${car.price}`}</div>
                    <div className="car-fuel">{`Xăng tiêu thụ: ${car.fuelConsumption}`}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isFetching ? (
          <div>Đang tải dữ liệu...</div>
        ) : loggedInUser ? (
          <div className="notification-wrapper">
            <i className="fas fa-bell bell-icon" aria-label="Notification"></i>
            <div className="dropdown-user">
              {avatar ? (
                <img
                  src={avatar}
                  alt="User Avatar"
                  className="profile-avatar"
                />
              ) : (
                <i
                  className="fas fa-user profile-icon"
                  aria-label="Profile"
                ></i>
              )}
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
