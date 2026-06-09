import express from "express";

import {
 updateProgress,
 getProgress,
}
from "../controllers/progressController.js";

import {
 verifyToken,
}
from "../middlewares/authMiddleware.js";

const router =
express.Router();

router.post(
 "/update",
 verifyToken,
 updateProgress
);

router.get(
 "/:courseId",
 verifyToken,
 getProgress
);

export default router;