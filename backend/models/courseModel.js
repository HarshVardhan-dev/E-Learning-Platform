import mongoose from "mongoose";

const courseSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  duration: { type: Number, required: true },
  price: { type: Number, required: true },
  instructor: { type: String, required: true },
  ratings: { type: Number, default: 0 },
});

const Course = mongoose.model("Course", courseSchema);

export default Course;
