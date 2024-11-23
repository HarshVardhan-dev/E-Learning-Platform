import mongoose from "mongoose";

// Reviews Schema

const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // References the User model
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Course Schema
const courseSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    duration: { type: Number, required: true },
    price: { type: Number, required: true },
    instructor: { type: String, required: true },
    ratings: { type: Number, default: 0 },
    reviews: [reviewSchema], // Array of reviews
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", courseSchema);

export default Course;
