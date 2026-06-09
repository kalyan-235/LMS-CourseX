
import express from "express";
import {
  verifyAdmin,
} from "../middlewares/adminMiddleware.js";
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
  verifyAdmin,
  getDashboardAnalytics
);

export default router;
