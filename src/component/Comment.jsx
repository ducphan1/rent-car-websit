import React from "react";
import "../asset/style/Comment.css";

import avata1 from "../asset/image/Profill.png";
import avata2 from "../asset/image/Profill (1).png";
const CommentSection = () => {
  const reviews = [
    {
      name: "Alex Stanton",
      position: "CEO at Bukalapak",
      avatar: avata1,
      text: "We are very happy with the service from the MORENT App. Morent has low prices and a large variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      date: "21 December 2024",
      rating: 4,
    },
    {
      name: "Skylar Dias",
      position: "CEO at Amazon",
      avatar: avata2,
      text: "We are greatly helped by the services of the MORENT App. Morent has low prices and a wide variety of cars with good and comfortable facilities. In addition, the service provided by the officers is also very friendly and very polite.",
      date: "20 December 2024",
      rating: 4,
    },
  ];

  const handleShowAll = () => {
    alert("Show all reviews!");
  };

  return (
    <div className="comment-section">
      <div className="comments">
        {reviews.map((review, index) => (
          <div className="comment-card" key={index}>
            <h2 className="comment-title">
              Reviews <span className="review-count">{reviews.length}</span>
            </h2>
            <div className="comment-header">
              <img src={review.avatar} alt={review.name} className="avatar" />
              <div>
                <h3 className="name">{review.name}</h3>
                <p className="position">{review.position}</p>
              </div>
            </div>
            <p className="comment-text">{review.text}</p>
            <div className="comment-footer">
              <span className="date">{review.date}</span>
              <div className="rating">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={i < review.rating ? "star filled" : "star"}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="show-all-button" onClick={handleShowAll}>
        Show All
      </button>
    </div>
  );
};

export default CommentSection;
