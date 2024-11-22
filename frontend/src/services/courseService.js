import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

export const fetchCourses = async (
  searchTerm = "",
  page = 1,
  limit = 10,
  category = "",
  minPrice = 0,
  maxPrice = Infinity,
  sort = "createdAt",
  order = "asc"
) => {
  try {
    const response = await axios.get(
      `${API_URL}?search=${searchTerm}&page=${page}&limit=${limit}&category=${category}&minPrice=${minPrice}&maxPrice=${maxPrice}&sort=${sort}&order=${order}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching courses:", error);
    throw error;
  }
};

export const fetchCourseById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error Fetching course details:", error);
    throw error;
  }
};
