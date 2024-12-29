import React, { useState, useEffect } from "react";
import "../asset/style/Comment.css";
import axios from "axios";

const mockApiUrl = "https://675bd7cb9ce247eb1937944f.mockapi.io/user";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (user) {
        try {
          const response = await axios.get(`${mockApiUrl}/${user.id}`);
          setComments(response.data.comments || []);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };
    fetchUserData();
  }, [user]);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("Please enter a comment.");
      return;
    }

    const newCommentData = {
      createdAt: new Date().toISOString(),
      comment: newComment,
    };

    const updatedComments = [newCommentData, ...comments];

    try {
      await axios.put(`${mockApiUrl}/${user.id}`, {
        ...user,
        comments: updatedComments,
      });
      setComments(updatedComments);
      setNewComment("");
    } catch (error) {
      console.error("Error updating comments:", error);
    }
  };

  return (
    <div className="comment-section">
      <h2 style={{ textAlign: "left" }}>Comments ({comments.length})</h2>
      {user ? (
        <div className="comment-form">
          <textarea
            placeholder="Write your comment here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      ) : (
        <p>Please log in to comment.</p>
      )}

      <div className="comments">
        {comments.map((comment, index) => (
          <div className="comment-card" key={index}>
            <div className="comment-header">
              <img src={user?.avatar} alt={user?.name} className="avatar" />
              <div>
                <h3 className="name">{user?.name}</h3>
                <p className="date">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            </div>
            <p className="comment-text">{comment.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;
