import express from "express";
import Course from "../models/courseModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const searchQuery = req.query.search || "";
    const category = req.query.category || "";
    const minPrice = req.query.minPrice ? Number(req.query.minPrice) : 0;
    const maxPrice = req.query.maxPrice ? Number(req.query.maxPrice) : Infinity;
    const sortBy = req.query.sort || "createdAt";
    const sortOrder = req.query.order === "desc" ? -1 : 1;
    const page = Number(req.query.page) > 0 ? Number(req.query.page) : 1;
    const limit = Number(req.query.limit) > 0 ? Number(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    const filter = {
      ...(searchQuery && { title: { $regex: searchQuery, $options: "i" } }),
      ...(category && { category }),
      ...(minPrice || maxPrice < Infinity
        ? { price: { $gte: minPrice, $lte: maxPrice } }
        : {}),
    };

    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(limit);

    res.json({
      courses,
      total,
      page,
      pages: total > 0 ? Math.ceil(total / limit) : 0,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      error: error.message,
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ message: "Course not Found" });
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
