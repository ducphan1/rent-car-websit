import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./pages/layout.jsx";
import Home from "./pages/Home";
import Detail from "./pages/detail.jsx";
import Payment from "./pages/payment.jsx";
import Shop from "./pages/shop.jsx";
import NoPage from "./pages/nopage";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import RentCarPage from "./pages/RentCar.jsx";
import AdminPage from "./pages/AdminDashBoard.jsx";
import Profile from "./component/Profile.jsx";

const ProtectedRoute = ({ role, requiredRole, children }) => {
  if (role !== requiredRole) {
    alert("Bạn không có quyền truy cập vào trang này.");
    return <Navigate to="/" />;
  }
  return children;
};

export default function App() {
  const [userRole, setUserRole] = useState("");

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const response = await fetch(
          "https://675bd7cb9ce247eb1937944f.mockapi.io/users/1",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setUserRole(data.role);
      } catch (error) {
        console.error("Error fetching user role:", error);
      }
    };

    fetchUserRole();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="detail/:id" element={<Detail />} />
          <Route path="payment" element={<Payment />} />
          <Route path="shop" element={<Shop />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="rent-car" element={<RentCarPage />} />
          <Route path="profile" element={<Profile />} />

          <Route
            path="admin"
            element={
              <ProtectedRoute role={userRole} requiredRole="admin">
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
