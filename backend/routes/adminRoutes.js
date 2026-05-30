
import express from "express";

import {
  getDashboardAnalytics,
} from "../controllers/adminController.js";

import {
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router =
express.Router();

router.get(
  "/dashboard",
  verifyToken,
  getDashboardAnalytics
);

export default router;
