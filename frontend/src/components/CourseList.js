import React, { useEffect, useState, useCallback, useContext } from "react";
import { fetchCourses } from "../services/courseService";
import SearchBar from "./SearchBar";
import CourseCard from "./CourseCard";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import Filters from "./Filters";

import { AuthContext } from "../contexts/AuthContext";

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState(null);

  const { user } = useContext(AuthContext);

  // Filters and Sorting
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: Infinity,
  });
  const [sortOptions, setSortOptions] = useState({
    sort: "createdAt",
    order: "asc",
  });

  // Debouncing search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000); // 1-second debounce delay
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const getCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchCourses(
        debouncedSearchTerm,
        page,
        10, // Limit
        filters.category,
        filters.minPrice,
        filters.maxPrice,
        sortOptions.sort,
        sortOptions.order
      );
      setCourses(data.courses);
      setTotalPages(data.pages);
    } catch (err) {
      setError("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  }, [
    debouncedSearchTerm,
    page,
    filters.category,
    filters.minPrice,
    filters.maxPrice,
    sortOptions.sort,
    sortOptions.order,
  ]);

  useEffect(() => {
    getCourses();
  }, [getCourses]);

  // Update filter values
  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1); // Reset to first page on filter change
  };

  // Update sort values
  const handleSortChange = (value) => {
    const [sort, order] = value.split("-");
    setSortOptions({ sort, order });
    setPage(1); // Reset to first page on sort change
  };

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage);
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen flex flex-col">
      {/* Search Bar */}
      <div className="bg-gray-100">
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>

      <div className="flex flex-grow">
        {/* Show Filters only if user is logged in */}
        {user && (
          <div className="w-full lg:w-1/4 p-4 bg-gray-50 border-r">
            {/* Filters Sidebar */}
            <Filters
              filters={filters}
              sortOption={`${sortOptions.sort}-${sortOptions.order}`}
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
            />
          </div>
        )}

        {/* Courses Section */}
        <div className="w-full lg:w-3/4 p-6">
          {courses.length === 0 ? (
            <p>No courses found. Try adjusting your search or filters.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              totalPages={totalPages}
              page={page}
              handlePageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseList;
