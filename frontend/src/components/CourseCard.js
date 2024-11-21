import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="card bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg p-4">
      <h2 className="text-xl font-semibold text-primary">{course.title}</h2>
      <p className="text-gray-700">{course.description}</p>
      <p className="text-sm text-gray-500">Category: {course.category}</p>
      <p className="font-bold text-lg">Price: ${course.price}</p>
      <button className="btn-primary mt-4">View Details</button>
    </div>
  );
};

export default CourseCard;
