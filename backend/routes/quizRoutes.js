import express from "express";

import {
 submitQuiz,
 getQuizResult,
}
from "../controllers/quizController.js";

import {
 verifyToken,
}
from "../middlewares/authMiddleware.js";

const router =
express.Router();

router.post(
 "/submit",
 verifyToken,
 submitQuiz
);


router.get(
 "/:courseId",
 verifyToken,
 getQuizResult
);

export default router;