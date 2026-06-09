import express from "express";

import {
 getStudents
}
from "../controllers/userController.js";

import {
 verifyToken
}
from "../middlewares/authMiddleware.js";

const router =
 express.Router();

router.get(
 "/students",
 verifyToken,
 getStudents
);

export default router;