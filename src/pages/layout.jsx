import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../component/Header";
import Footer from "../component/Footer";
import Home from "./Home";
import Detail from "./detail";
import Payment from "./payment";
import Shop from "./shop";
import LoginPage from "./Login";
import RegisterPage from "./Register";
import RentCarPage from "./RentCar";
import AdminPage from "./AdminDashBoard";
import CarList from "../component/CarList";
import Profile from "../component/Profile";

function Layout() {
  return (
    <div>
      <Header onSearch={(term) => console.log(term)} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/cars" element={<CarList />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rent-car" element={<RentCarPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default Layout;
