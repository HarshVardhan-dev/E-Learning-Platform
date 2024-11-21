import mongoose from "mongoose";
import dotenv from "dotenv";
import Course from "./models/courseModel.js";
import connectDB from "./config/db.js";
import { courses } from "./CourseData.js";

dotenv.config();
connectDB();

const seedCourses = async () => {
  try {
    // Clear the database
    await Course.deleteMany();

    // Insert the sample courses
    await Course.insertMany(courses);

    console.log("Sample courses added successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding courses:", error);
    process.exit(1);
  }
};

seedCourses();
