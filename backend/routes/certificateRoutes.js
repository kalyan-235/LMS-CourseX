import express
from "express";

import {
 issueCertificate,
 getMyCertificates,
 getAllCertificates,
 deleteCertificate
} from "../controllers/certificateController.js";

import {
 verifyToken
} from "../middlewares/authMiddleware.js";

import {
 verifyAdmin
} from "../middlewares/adminMiddleware.js";

const router =
express.Router();

router.post(
 "/issue",
 verifyToken,
 issueCertificate
);

router.get(
 "/my",
 verifyToken,
 getMyCertificates
);

router.get(
 "/",
 verifyToken,
 verifyAdmin,
 getAllCertificates
);

router.delete(
 "/:id",
 verifyToken,
 verifyAdmin,
 deleteCertificate
);

export default router;