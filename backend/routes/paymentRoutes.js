import express from "express";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { verifyAdmin } from "../middlewares/adminMiddleware.js";
import {
  createPaymentOrder,
  verifyPayment,
  getPaymentStatus,
  getAllPayments,
  getUserPayments,
  requestRefund,
  processRefund,
} from "../controllers/paymentController.js";

const router = express.Router();

// Create payment order
router.post("/create-order", verifyToken, createPaymentOrder);

// Verify payment
router.post("/verify", verifyToken, verifyPayment);

// Get payment status
router.get("/status/:paymentId", verifyToken, getPaymentStatus);

// Get user's own payments
router.get("/my", verifyToken, getUserPayments);

// Request refund (user)
router.post("/refund/request", verifyToken, requestRefund);

// Process refund (admin)
router.post("/refund/process", verifyToken, verifyAdmin, processRefund);

// Get all payments (Admin only)
router.get("/all", verifyToken, verifyAdmin, getAllPayments);

export default router;
