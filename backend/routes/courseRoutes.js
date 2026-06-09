import express from "express";

import {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  updateCourseQuiz,
  deleteCourse,
} from "../controllers/courseController.js";

import { verifyToken }
from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);

router.get("/:id", getSingleCourse);
router.put(
 "/:id/quiz",
 verifyToken,
 updateCourseQuiz
);

router.post(
  "/",
  verifyToken,
  createCourse
);



router.put(
  "/:id",
  verifyToken,
  updateCourse
);

router.delete(
  "/:id",
  verifyToken,
  deleteCourse
);

export default router;