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

/**
 * Submit a review for a course.
 * @param {string} courseId - The ID of the course to review.
 * @param {object} reviewData - An object containing `rating` and `comment`.
 * @param {string} token - The JWT token for authentication.
 * @returns {Promise<object>} - The response data from the server.
 */
export const submitReview = async (courseId, reviewData, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include token in the Authorization header
      },
    };

    const response = await axios.post(
      `${API_URL}/${courseId}/reviews`, // Endpoint for submitting reviews
      reviewData,
      config
    );

    return response.data; // Return the response data
  } catch (error) {
    console.error("Error submitting review:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
};
