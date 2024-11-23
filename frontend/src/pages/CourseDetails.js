import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById } from "../services/courseService";
import ReviewForm from "../Forms/ReviewForm.js";
import { AuthContext } from "../contexts/AuthContext.js";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
        setReviews(data.reviews || []); // Assume course has a reviews array
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

  const handleReviewSubmitted = (rating, comment) => {
    // Refresh reviews when a new review is submitted
    setReviews((prev) => [...prev, { name: user.name, rating, comment }]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-xl text-red-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <button
        onClick={() => navigate("/")}
        className="mb-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Back to Home
      </button>
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <img
          src={`https://via.placeholder.com/800x400?text=${encodeURIComponent(
            course.title
          )}`}
          alt={course.title}
          className="w-full h-60 object-cover rounded-lg mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {course.title}
        </h1>
        <p className="text-lg text-gray-700 mb-6">{course.description}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-600">
          <p>
            <span className="font-semibold">Category:</span> {course.category}
          </p>
          <p>
            <span className="font-semibold">Price:</span> ${course.price}
          </p>
          <p>
            <span className="font-semibold">Duration:</span> {course.duration}{" "}
            hours
          </p>
          <p>
            <span className="font-semibold">Instructor:</span>{" "}
            {course.instructor}
          </p>
          <p>
            <span className="font-semibold">Ratings:</span> {course.ratings}
          </p>
        </div>
        {/* Reviews */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Reviews</h2>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div
                key={index}
                className="p-4 border rounded-lg mb-4 bg-gray-50 shadow"
              >
                <strong>{review.name}</strong>
                <p>Rating: {review.rating}/5</p>
                <p>{review.comment}</p>
              </div>
            ))
          ) : (
            <p>No reviews yet. Be the first to review!</p>
          )}
        </div>
        {/* Review Form */}
        {/* Review Form */}
        {user?.token ? (
          <ReviewForm
            courseId={id}
            token={user.token}
            onReviewSubmitted={(rating, comment) =>
              handleReviewSubmitted(rating, comment)
            }
          />
        ) : (
          <div className="text-center my-6">
            <p className="text-lg font-semibold mb-4">
              Want to leave a review? Please log in or register first.
            </p>
            <button
              onClick={() => navigate(`/auth?redirect=/courses/${id}`)}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
            >
              Log In / Register
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseDetails;
