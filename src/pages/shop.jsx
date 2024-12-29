import React from "react";
import MyShop from "../component/MyShop";
import FormSection from "../component/FormSection";
import "./style/shop.css";

const Shop = () => {
  return (
    <div className="myshop">
      <FormSection />
      <MyShop />
    </div>
  );
};

export default Shop;
