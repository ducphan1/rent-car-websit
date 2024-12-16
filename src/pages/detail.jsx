import React from "react";

import "./style/detail.module.css";

import DetailCar from "../component/DetailCar";
import CommentSection from "../component/Comment";
import RecentCar from "../component/RecenCar";

const Detail = () => {
  return (
    <div className="detail2">
      <DetailCar />
      <CommentSection />
      <RecentCar />
    </div>
  );
};

export default Detail;
