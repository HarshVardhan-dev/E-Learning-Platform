import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCourseById } from "../services/courseService";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCourse = async () => {
      try {
        const data = await fetchCourseById(id);
        setCourse(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getCourse();
  }, [id]);

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
      </div>
    </div>
  );
};

export default CourseDetails;
