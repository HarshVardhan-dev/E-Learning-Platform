import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchCourseById } from "../services/courseService";

const CourseDetails = () => {
  const { id } = useParams();
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
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-gray-500 animate-pulse">Loading...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl text-red-500">Course not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6 sm:mt-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">
        {course.title}
      </h1>
      <p className="text-base sm:text-lg text-gray-700 mb-4">
        {course.description}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <p className="text-gray-500">
          <span className="font-semibold">Category:</span> {course.category}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Price:</span> ${course.price}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Duration:</span> {course.duration}{" "}
          hours
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Instructor:</span> {course.instructor}
        </p>
        <p className="text-gray-500">
          <span className="font-semibold">Ratings:</span> {course.ratings}
        </p>
      </div>
    </div>
  );
};

export default CourseDetails;
