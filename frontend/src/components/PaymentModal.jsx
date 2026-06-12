import { useState, useRef } from "react";
import API from "../api/axios";
import "../css/paymentmodal.css";

export default function PaymentModal({ course, onClose, onPaymentSuccess }) {
  const [step, setStep] = useState("confirm"); // confirm | processing | error
  const [errorMsg, setErrorMsg] = useState("");
  const runningRef = useRef(false);

  const priceNum =
    parseInt(String(course.price).replace(/[^0-9]/g, ""), 10) || 0;

  // ─── Confirm click ─────────────────────────────────────────────────
  const handlePay = async () => {
    if (runningRef.current) return;
    runningRef.current = true;
    setStep("processing"); // show spinner immediately
    setErrorMsg("");

    try {
      // Step 1 — create order
      let orderRes;
      try {
        orderRes = await API.post("/payments/create-order", {
          courseId: course._id,
        });
      } catch (err) {
        const status = err?.response?.status;
        const msg    = err?.response?.data?.message || "";

        // Already enrolled → just update UI silently
        if (status === 400 && msg.toLowerCase().includes("already enrolled")) {
          onPaymentSuccess(null);
          onClose();
          return;
        }
        throw err;
      }

      const { orderId, amount, key, paymentId: paymentRecordId } = orderRes.data;

      // Detect mock mode from the key returned by backend
      const isMock = !key || key === "rzp_test_1234567890abcd" || !window.Razorpay;

      if (isMock) {
        // Step 2 — verify (marks payment success in DB — needed by enroll check)
        await API.post("/payments/verify", {
          orderId,
          paymentId: `pay_mock_${Date.now()}`,
          signature: `sig_mock_${Date.now()}`,
          paymentRecordId,
        });

        // Step 3 — enroll (payment.status is now "success" so it passes)
        await onPaymentSuccess(paymentRecordId);

        // Done
        onClose();

      } else {
        // Real Razorpay
        await openRazorpay({ orderId, amount, key, paymentRecordId });
      }

    } catch (err) {
      console.error("[PaymentModal]", err?.response?.data || err?.message);
      const msg = err?.response?.data?.message || err?.message || "Something went wrong";
      setErrorMsg(msg);
      setStep("error");
    } finally {
      runningRef.current = false;
    }
  };

  // ─── Real Razorpay ─────────────────────────────────────────────────
  const openRazorpay = ({ orderId, amount, key, paymentRecordId }) =>
    new Promise((resolve, reject) => {
      const user = (() => {
        try { return JSON.parse(localStorage.getItem("user") || "{}"); }
        catch { return {}; }
      })();

      const rzp = new window.Razorpay({
        key, amount, currency: "INR",
        name: "CourseX",
        description: course.title,
        order_id: orderId,
        handler: async (response) => {
          try {
            const vRes = await API.post("/payments/verify", {
              orderId,
              paymentId: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              paymentRecordId,
            });
            if (!vRes.data?.success) throw new Error("Verification failed");
            await onPaymentSuccess(paymentRecordId);
            onClose();
            resolve();
          } catch (err) { reject(err); }
        },
        modal: { ondismiss: () => { setStep("confirm"); resolve(); } },
        prefill: { name: user.name || "", email: user.email || "" },
        theme: { color: "#6366f1" },
      });
      rzp.on("payment.failed", (r) =>
        reject(new Error(r?.error?.description || "Payment declined"))
      );
      rzp.open();
    });

  const isProcessing = step === "processing";

  return (
    <div
      className="payment-modal-overlay"
      onClick={(e) => { if (e.target === e.currentTarget && !isProcessing) onClose(); }}
    >
      <div className="payment-modal">

        {!isProcessing && (
          <button className="payment-close" onClick={onClose} aria-label="Close">✕</button>
        )}

        <div className="payment-header">
          <h2>Complete Your Purchase</h2>
        </div>

        <div className="payment-body">

          {/* Course info */}
          <div className="course-summary">
            <img
              src={course.image}
              alt={course.title}
              className="course-thumb"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=200&h=120&fit=crop";
              }}
            />
            <div className="course-details">
              <h3>{course.title}</h3>
              <p className="instructor">By {course.author}</p>
              <div className="price-section">
                <span className="course-price">₹{priceNum}</span>
                {course.oldPrice && (
                  <span className="old-price">₹{course.oldPrice}</span>
                )}
              </div>
            </div>
          </div>

          <div className="payment-divider" />

          {/* CONFIRM */}
          {step === "confirm" && (
            <>
              <div className="payment-info">
                <div className="info-item">
                  <span>💳 Payment</span>
                  <strong>Mock / Test Mode</strong>
                </div>
                <div className="info-item">
                  <span>🛡️ Secure</span>
                  <strong>256-bit SSL Encrypted</strong>
                </div>
                <div className="info-item">
                  <span>♾️ Access</span>
                  <strong>Lifetime access after purchase</strong>
                </div>
              </div>

              <div className="mock-notice">
                🧪 <strong>Test Mode</strong> — No real payment charged.
                Click below to enroll instantly.
              </div>

              <div className="payment-divider" />

              <button className="payment-btn" onClick={handlePay}>
                🧪 Confirm &amp; Enroll Now &nbsp;·&nbsp; ₹{priceNum}
              </button>
              <button className="payment-cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </>
          )}

          {/* PROCESSING */}
          {step === "processing" && (
            <div className="payment-processing">
              <div className="payment-spinner" />
              <p>Enrolling you in the course…</p>
              <p className="payment-processing-note">
                Please do not close this window.
              </p>
            </div>
          )}

          {/* ERROR */}
          {step === "error" && (
            <div className="payment-error-state">
              <div className="payment-error-icon">❌</div>
              <h3>Something went wrong</h3>
              <p>{errorMsg}</p>
              <button
                className="payment-btn"
                onClick={() => { setStep("confirm"); setErrorMsg(""); }}
              >
                Try Again
              </button>
              <button className="payment-cancel-btn" onClick={onClose}>
                Cancel
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
