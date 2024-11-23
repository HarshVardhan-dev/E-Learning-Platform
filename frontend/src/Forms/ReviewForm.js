import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { submitReview } from "../services/courseService";

const ReviewForm = ({ courseId, token, onReviewSubmitted }) => {
  const [rating, setRating] = useState("");
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    if (!token) {
      navigate(`/auth?redirect=/courses/${courseId}`);
      return;
    }

    if (!rating || rating < 1 || rating > 5) {
      setError("Rating must be between 1 and 5");
      return;
    }

    if (!comment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    try {
      await submitReview(courseId, { rating, comment }, token); // Use the service method
      onReviewSubmitted(rating, comment); // Notify parent to refresh reviews
      setRating("");
      setComment("");
    } catch (err) {
      console.error("Error details:", err.response || err.message);
      setError(err.response?.data?.message || "Error submitting review");
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Leave a Review</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block font-medium mb-2">
            Rating (1-5)
          </label>
          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="">Select a rating</option>
            {[1, 2, 3, 4, 5].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="comment" className="block font-medium mb-2">
            Comment
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write your review"
            className="w-full p-2 border rounded-lg"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
