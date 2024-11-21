import React, { useEffect, useState } from "react";
import { fetchCourses } from "../services/courseService";
import SearchBar from "./SearchBar";
import CourseCard from "./CourseCard";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const getCourses = async () => {
      try {
        const data = await fetchCourses(searchTerm);
        setCourses(data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    getCourses();
  }, [searchTerm]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <SearchBar onSearch={setSearchTerm} />
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ul>
          {courses.map((course) => (
            <CourseCard course={course} />
          ))}
        </ul>
      </div>
    </>
  );
};

export default CourseList;
