import express
from "express";

import upload from "../middlewares/uploadMiddleware.js";
import {uploadImage,uploadPdf,}from "../controllers/uploadController.js";
const router =
express.Router();

router.post("/image",upload.single("image"),uploadImage);
router.post("/pdf",upload.single("pdf"),uploadPdf);
export default router;