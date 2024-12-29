import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../asset/style/Profile.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedEmail, setUpdatedEmail] = useState("");
  const [updatedAvatar, setUpdatedAvatar] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      alert("Bạn chưa đăng nhập!");
      navigate("/login");
      return;
    }

    const { id } = JSON.parse(storedUser);
    const fetchUser = async () => {
      try {
        const response = await fetch(
          `https://675bd7cb9ce247eb1937944f.mockapi.io/user/${id}`
        );
        const data = await response.json();
        setUser(data);
        setUpdatedName(data.name);
        setUpdatedEmail(data.email);
        setUpdatedAvatar(data.avatar);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleUpdateProfile = async () => {
    if (!user) return;

    const updatedData = {
      name: updatedName,
      email: updatedEmail,
      avatar: updatedAvatar,
    };

    try {
      const response = await fetch(
        `https://675bd7cb9ce247eb1937944f.mockapi.io/user/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      setUser(data);
      alert("Profile updated successfully");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-container">
      <h2>Profile Information</h2>
      <div className="profile-card">
        <img src={user.avatar} alt="Avatar" className="profile-avatar1" />
        <div>
          <h3>{user.name}</h3>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>
      </div>

      <h3>Update Profile</h3>
      <div className="update-form">
        <label>
          Name:
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={updatedEmail}
            onChange={(e) => setUpdatedEmail(e.target.value)}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            value={updatedAvatar}
            onChange={(e) => setUpdatedAvatar(e.target.value)}
          />
        </label>

        <button onClick={handleUpdateProfile}>Update</button>
      </div>
    </div>
  );
};

export default Profile;
