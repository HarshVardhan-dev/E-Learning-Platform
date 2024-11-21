import axios from "axios";

const API_URL = "http://localhost:5000/api/courses";

export const fetchCourses = async (searchTerm = "", page = 1, limit = 8) => {
  console.log(`Fetching courses with term: "${searchTerm}" and page: ${page}`);
  try {
    const response = await axios.get(
      `${API_URL}?search=${searchTerm}&page=${page}&limit=${limit}`
    );
    console.log("API Response:", response.data);
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
