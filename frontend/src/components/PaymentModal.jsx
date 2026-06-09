import { useState } from "react";
import API from "../api/axios";
import "../css/paymentmodal.css";

export default function PaymentModal({
  course,
  onClose,
  onPaymentSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [paymentId, setPaymentId] = useState(null);
  const [mockMode, setMockMode] = useState(false);
  const [showMockConfirm, setShowMockConfirm] = useState(false);

  const handleCreateOrder = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Create payment order from backend
      const response = await API.post(
        "/payments/create-order",
        { courseId: course._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const {
        orderId: razorpayOrderId,
        amount,
        key,
        paymentId: paymentRecordId,
      } = response.data;

      setOrderId(razorpayOrderId);
      setPaymentId(paymentRecordId);

      // Check if in mock mode (placeholder key detected)
      const isMockMode = key === "rzp_test_1234567890abcd";
      setMockMode(isMockMode);

      if (isMockMode) {
        // Mock mode: Show confirmation dialog instead of Razorpay
        setShowMockConfirm(true);
      } else {
        // Real mode: Open Razorpay checkout
        const options = {
          key: key,
          amount: amount,
          currency: "INR",
          name: "CourseX",
          description: course.title,
          order_id: razorpayOrderId,
          handler: async (response) => {
            await verifyPayment(
              razorpayOrderId,
              response.razorpay_payment_id,
              response.razorpay_signature,
              paymentRecordId
            );
          },
          prefill: {
            name: localStorage.getItem("userName") || "",
            email: localStorage.getItem("userEmail") || "",
          },
          theme: {
            color: "#4F46E5",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
      }
    } catch (error) {
      console.log(error);
      window.addToast("Failed to create payment order: " + (error.response?.data?.message || error.message), "error");
    } finally {
      setLoading(false);
    }
  };

  const handleMockPaymentConfirm = async () => {
    try {
      setLoading(true);
      // In mock mode, generate mock payment details and verify
      const mockPaymentId = `pay_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const mockSignature = `sig_mock_${Date.now()}`;

      await verifyPayment(orderId, mockPaymentId, mockSignature, paymentId);
      setShowMockConfirm(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (
    orderId,
    paymentId,
    signature,
    paymentRecordId
  ) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      // Verify payment with backend
      const response = await API.post(
        "/payments/verify",
        {
          orderId,
          paymentId,
          signature,
          paymentRecordId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        window.addToast("Payment successful!", "success");
        // Call the success callback which will handle enrollment
        onPaymentSuccess(paymentRecordId);
        onClose();
      }
    } catch (error) {
      console.log(error);
      window.addToast("Payment verification failed: " + (error.response?.data?.message || error.message), "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <div className="payment-close" onClick={onClose}>
          ✕
        </div>

        <div className="payment-header">
          <h2>Complete Your Purchase</h2>
        </div>

        <div className="payment-body">
          <div className="course-summary">
            <img
              src={course.image}
              alt={course.title}
              className="course-thumb"
            />
            <div className="course-details">
              <h3>{course.title}</h3>
              <p className="instructor">By {course.author}</p>
              <div className="price-section">
                <span className="course-price">{course.price}</span>
                {course.oldPrice && (
                  <span className="old-price">{course.oldPrice}</span>
                )}
              </div>
            </div>
          </div>

          <div className="payment-divider"></div>

          <div className="payment-info">
            <div className="info-item">
              <span>💳 Payment Method</span>
              <strong>Razorpay (UPI, Card, Wallet)</strong>
            </div>
            <div className="info-item">
              <span>🛡️ Secure Payment</span>
              <strong>256-bit SSL Encrypted</strong>
            </div>
            <div className="info-item">
              <span>✅ Access Forever</span>
              <strong>Lifetime access after purchase</strong>
            </div>
          </div>

          <div className="payment-divider"></div>

          <button
            className="payment-btn"
            onClick={handleCreateOrder}
            disabled={loading}
          >
            {loading ? "⏳ Processing..." : "💳 Pay Now with Razorpay"}
          </button>

          <p className="payment-note">
            ℹ️ You'll be redirected to Razorpay to complete the payment securely
          </p>
        </div>

        {/* Mock Payment Confirmation Dialog */}
        {showMockConfirm && (
          <div className="mock-confirm-overlay">
            <div className="mock-confirm-modal">
              <div className="mock-confirm-header">
                <h2>🧪 Mock Payment Confirmation</h2>
                <p className="mock-badge">TEST MODE</p>
              </div>

              <div className="mock-confirm-body">
                <div className="mock-details">
                  <div className="mock-detail-item">
                    <span className="mock-label">Course</span>
                    <span className="mock-value">{course.title}</span>
                  </div>
                  <div className="mock-detail-item">
                    <span className="mock-label">Amount</span>
                    <span className="mock-value">{course.price}</span>
                  </div>
                  <div className="mock-detail-item">
                    <span className="mock-label">Order ID</span>
                    <span className="mock-value">{orderId}</span>
                  </div>
                  <div className="mock-detail-item">
                    <span className="mock-label">Mode</span>
                    <span className="mock-value">🔧 Development/Testing</span>
                  </div>
                </div>

                <div className="mock-warning">
                  <p>⚠️ This is a mock payment. No actual payment will be processed.</p>
                  <p>Confirming will complete the enrollment for testing purposes.</p>
                </div>

                <div className="mock-actions">
                  <button
                    className="mock-confirm-btn"
                    onClick={handleMockPaymentConfirm}
                    disabled={loading}
                  >
                    {loading ? "⏳ Processing..." : "✅ Confirm Mock Payment"}
                  </button>
                  <button
                    className="mock-cancel-btn"
                    onClick={() => setShowMockConfirm(false)}
                    disabled={loading}
                  >
                    ✕ Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
