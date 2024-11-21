import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses();
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCourses();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>Available Courses</h1>
      <ul>
        {courses.map((course) => (
          <li key={course._id}>
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>Category: {course.category}</p>
            <p>Price: ${course.price}</p>
            <p>Instructor: {course.instructor}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
