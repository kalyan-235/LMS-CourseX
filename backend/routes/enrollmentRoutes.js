import express from "express";

import {
  enrollCourse,
  getMyCourses,
  updateProgress,
} from "../controllers/enrollmentController.js";

import {
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/enroll",
  verifyToken,
  enrollCourse
);

router.get(
  "/my-courses",
  verifyToken,
  getMyCourses
);

router.put(
  "/progress/:enrollmentId",
  verifyToken,
  updateProgress
);

export default router;