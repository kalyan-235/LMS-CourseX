import express from "express";

import {
  getNotes,
  addNote,
  deleteNote,
} from "../controllers/noteController.js";

import {
  verifyToken,
} from "../middlewares/authMiddleware.js";

const router =
  express.Router();

router.get(
  "/:courseId",
  verifyToken,
  getNotes
);

router.post(
  "/:courseId",
  verifyToken,
  addNote
);

router.delete(
  "/:noteId",
  verifyToken,
  deleteNote
);

export default router;
