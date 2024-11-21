import React, { useEffect, useState, useCallback } from "react";
import { fetchCourses } from "../services/courseService";
import SearchBar from "./SearchBar";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  // Debouncing the search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 2000); // 2000ms delay

    return () => clearTimeout(handler);
  }, [searchTerm]);

  const getCourses = async (term, page) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourses(term, page);
      setCourses(data.courses);
      setTotalPages(data.pages);
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses(debouncedSearchTerm, page);
  }, [debouncedSearchTerm, page]);

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      {courses.length === 0 ? (
        <p>No courses found. Try adjusting your search.</p>
      ) : (
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
      <div className="flex justify-center mt-4">
        <Pagination
          totalPages={totalPages}
          page={page}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default CourseList;
