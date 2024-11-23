import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import express from "express";
import courseRoutes from "./routes/courseRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/courses", courseRoutes);
app.use("/api/users", userRoutes);

// DataBase Connection
connectDB();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));
