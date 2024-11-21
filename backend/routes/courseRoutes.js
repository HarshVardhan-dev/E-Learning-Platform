import express from "express";

import Course from "../models/courseModel.js";

const router = express.Router();

// Get all Courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

export default router;
