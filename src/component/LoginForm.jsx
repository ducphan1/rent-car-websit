import React, { useState, useEffect } from "react";
import axios from "axios";
import "../asset/style/Login.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        "https://675bd7cb9ce247eb1937944f.mockapi.io/user"
      );
      const users = response.data;

      const user = users.find(
        (u) => u.username === username && u.password === password
      );

      if (user) {
        setError("");
        localStorage.setItem("user", JSON.stringify(user));
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("Invalid username or password. Please try again.");
      }
    } catch (err) {
      console.error("Error fetching users:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="auth-box">
      <h2 className="auth-title">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="auth-input-group">
          <i className="fas fa-user auth-icon"></i>
          <input
            type="text"
            placeholder="User Name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="auth-input-group">
          <i className="fas fa-lock auth-icon"></i>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="auth-error">{error}</p>}
        <button type="submit" className="auth-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
