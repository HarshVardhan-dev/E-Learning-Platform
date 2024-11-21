import express from "express";
import Course from "../models/courseModel.js";
const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const courses = await Course.find({
      title: { $regex: searchQuery, $options: "i" }, // Case-insensitive search
    });
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
