import express from "express";

import {
  addReview,
  getReviews,
} from "../controllers/reviewController.js";

import {
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/:courseId",
  verifyToken,
  addReview
);

router.get(
  "/:courseId",
  getReviews
);

export default router;