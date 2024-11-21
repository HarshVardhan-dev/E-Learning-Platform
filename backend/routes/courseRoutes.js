import express from "express";
import Course from "../models/courseModel.js";
const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  try {
    // Extract query parameters
    const searchQuery = req.query.search || "";
    const page =
      Number.isInteger(Number(req.query.page)) && Number(req.query.page) > 0
        ? Number(req.query.page)
        : 1;
    const limit =
      Number.isInteger(Number(req.query.limit)) && Number(req.query.limit) > 0
        ? Number(req.query.limit)
        : 10;
    const skip = (page - 1) * limit;

    // Filter logic for search functionality
    const filter = searchQuery
      ? { title: { $regex: searchQuery, $options: "i" } } // Case-insensitive regex search
      : {};

    // Count the total number of courses matching the filter
    const total = await Course.countDocuments(filter);

    // Fetch paginated data
    const courses = await Course.find(filter).skip(skip).limit(limit);

    // Respond with paginated results
    res.json({
      courses,
      total,
      page,
      pages: total > 0 ? Math.ceil(total / limit) : 0, // Calculate the total number of pages
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

export default router;
