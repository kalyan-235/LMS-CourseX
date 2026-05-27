import express from "express";

import {
  getCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

import { verifyToken }
from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", getCourses);

router.get("/:id", getSingleCourse);

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