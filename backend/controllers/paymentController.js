import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../models/Payment.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";
import { sendPaymentReceipt, sendRefundNotification } from "../utils/sendEmail.js";

// Check if using mock mode
const USE_MOCK_PAYMENT = process.env.RAZORPAY_KEY_ID === "rzp_test_1234567890abcd" || process.env.USE_MOCK_PAYMENT === "true";

// Initialize Razorpay (only if not in mock mode)
let razorpay;
if (!USE_MOCK_PAYMENT) {
  razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });
}

// CREATE ORDER FOR PAYMENT
export const createPaymentOrder = async (req, res) => {
  try {
    const { courseId } = req.body;
    const userId = req.user.id;

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Extract price (remove rupee symbol if present)
    const priceString = course.price.replace(/[^0-9]/g, "");
    const amount = Math.round(parseFloat(priceString) * 100); // Convert to paise

    let orderId;

    // Create order (Mock or Real)
    if (USE_MOCK_PAYMENT) {
      // Mock mode: Generate fake order ID
      orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      console.log("🎭 MOCK MODE - Generated order ID:", orderId);
    } else {
      // Real mode: Create Razorpay order
      const order = await razorpay.orders.create({
        amount: amount,
        currency: "INR",
        receipt: `course_${courseId}_${userId}_${Date.now()}`,
        notes: {
          userId: userId,
          courseId: courseId,
          courseName: course.title,
        },
      });
      orderId = order.id;
    }

    // Save payment record in database
    const payment = await Payment.create({
      userId,
      courseId,
      orderId: orderId,
      amount: amount / 100, // Store in rupees
      status: "pending",
    });

    res.status(200).json({
      success: true,
      orderId: orderId,
      amount: amount,
      key: process.env.RAZORPAY_KEY_ID,
      currency: "INR",
      paymentId: payment._id,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
    });
  }
};

// VERIFY PAYMENT AND UPDATE STATUS
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature, paymentRecordId } = req.body;
    const userId = req.user.id;

    // In mock mode, skip signature verification
    if (!USE_MOCK_PAYMENT) {
      // Real mode: Verify Razorpay signature
      const hmac = crypto.createHmac(
        "sha256",
        process.env.RAZORPAY_KEY_SECRET
      );
      hmac.update(orderId + "|" + paymentId);
      const generatedSignature = hmac.digest("hex");

      if (generatedSignature !== signature) {
        // Update payment status to failed
        await Payment.findByIdAndUpdate(paymentRecordId, {
          status: "failed",
          failureReason: "Invalid signature",
        });

        return res.status(400).json({
          success: false,
          message: "Payment verification failed",
        });
      }
    } else {
      // Mock mode: Log verification
      console.log("🎭 MOCK MODE - Payment verification skipped");
    }

    // Update payment record
    const payment = await Payment.findByIdAndUpdate(
      paymentRecordId,
      {
        paymentId,
        signature,
        status: "success",
        completedAt: new Date(),
      },
      { new: true }
    ).populate("userId").populate("courseId");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment record not found",
      });
    }

    // Send receipt email
    try {
      await sendPaymentReceipt(
        payment.userId.email,
        payment.userId.name,
        payment.courseId.title,
        {
          orderId: payment.orderId,
          amount: payment.amount,
          paymentMethod: payment.paymentMethod,
          paymentId: payment.paymentId,
          createdAt: payment.createdAt,
        }
      );
    } catch (emailError) {
      console.log("Failed to send receipt email:", emailError);
      // Don't fail the payment if email fails
    }

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Payment verification error",
    });
  }
};

// GET PAYMENT STATUS
export const getPaymentStatus = async (req, res) => {
  try {
    const { paymentId } = req.params;

    const payment = await Payment.findById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: "Payment record not found" });
    }

    res.status(200).json(payment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching payment status" });
  }
};

// GET ALL PAYMENTS (ADMIN)
export const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find()
      .populate("userId", "name email")
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching payments" });
  }
};

// GET USER'S OWN PAYMENTS
export const getUserPayments = async (req, res) => {
  try {
    const userId = req.user.id;

    const payments = await Payment.find({ userId })
      .populate("courseId", "title price")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching user payments" });
  }
};

// REQUEST REFUND (USER)
export const requestRefund = async (req, res) => {
  try {
    const { paymentId, reason } = req.body;
    const userId = req.user.id;

    const payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    if (payment.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Not your payment" });
    }

    if (payment.status !== "success") {
      return res
        .status(400)
        .json({
          message:
            "Can only refund successful payments",
        });
    }

    if (payment.refundStatus !== "none") {
      return res.status(400).json({
        message:
          "Refund already requested for this payment",
      });
    }

    // Check if within refund window (7 days)
    const daysSincePurchase = Math.floor(
      (Date.now() -
        new Date(payment.createdAt)) /
      (1000 * 60 * 60 * 24)
    );

    if (daysSincePurchase > 7) {
      return res.status(400).json({
        message:
          "Refund period expired (7 days from purchase)",
      });
    }

    // Mark as refund pending
    payment.refundStatus = "pending";
    payment.refundReason = reason;
    payment.refundRequestedAt = new Date();
    await payment.save();

    res.status(200).json({
      message:
        "Refund requested successfully",
      payment,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Error requesting refund",
    });
  }
};

// PROCESS REFUND (ADMIN)
export const processRefund = async (req, res) => {
  try {
    const { paymentId, approve } = req.body;

    let payment = await Payment.findById(paymentId);

    if (!payment) {
      return res.status(404).json({
        message:
          "Payment not found",
      });
    }

    if (
      payment.refundStatus !== "pending"
    ) {
      return res.status(400).json({
        message:
          "No pending refund for this payment",
      });
    }

    if (approve) {
      // Mark refund as completed
      payment.refundStatus = "completed";
      payment.refundAmount = payment.amount;
      payment.refundProcessedAt =
        new Date();

      // Unenroll user from course
      await Enrollment.deleteOne({
        userId: payment.userId,
        courseId: payment.courseId,
      });

      await payment.save();

      // Populate user and course info for email
      payment = await Payment.findById(paymentId)
        .populate("userId")
        .populate("courseId");

      // Send refund notification email
      try {
        await sendRefundNotification(
          payment.userId.email,
          payment.userId.name,
          payment.courseId.title,
          {
            amount: payment.amount,
            processedAt: payment.refundProcessedAt,
          }
        );
      } catch (emailError) {
        console.log("Failed to send refund email:", emailError);
        // Don't fail the refund if email fails
      }

      return res.status(200).json({
        message:
          "Refund approved and processed",
        payment,
      });
    } else {
      // Mark refund as failed
      payment.refundStatus = "failed";
      payment.refundProcessedAt =
        new Date();

      await payment.save();

      return res.status(200).json({
        message:
          "Refund request rejected",
        payment,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message:
        "Error processing refund",
    });
  }
};
