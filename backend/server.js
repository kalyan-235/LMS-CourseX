import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import noteRoutes from "./routes/noteRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import quizRoutes from "./routes/quizRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import certificateRoutes from "./routes/certificateRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import userRoutes from "./routes/userRoutes.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// connect database
connectDB();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollmentRoutes);
app.use("/api/admin",adminRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/quiz", quizRoutes);
app.use("/api/upload", uploadRoutes );
app.use("/api/certificates", certificateRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/users", userRoutes);


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});