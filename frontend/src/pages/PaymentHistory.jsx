import { useEffect, useState } from "react";
import API from "../api/axios";
import Loading from "../components/Loading";
import "../css/paymenthistory.css";

export default function PaymentHistory() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [refundModal, setRefundModal] = useState(false);
  const [refundReason, setRefundReason] = useState("");

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      const res = await API.get("/payments/my");
      setPayments(res.data || []);
    } catch (err) {
      console.log("Error fetching payment history:", err);
      window.addToast?.("Failed to load payment history", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  const filteredPayments = payments
    .filter((payment) => {
      if (filterStatus !== "all" && payment.status !== filterStatus) {
        return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          payment.courseId?.title?.toLowerCase().includes(searchLower) ||
          payment.orderId?.includes(searchLower)
        );
      }

      return true;
    })
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  const generateReceipt = (payment) => {
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Payment Receipt</title>
        <style>
          body { font-family: Arial, sans-serif; color: #333; }
          .receipt { max-width: 800px; margin: 0 auto; padding: 20px; }
          .header { text-align: center; border-bottom: 2px solid #667eea; padding-bottom: 20px; }
          .header h1 { color: #667eea; margin: 0; }
          .details { margin: 20px 0; }
          .row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
          .label { font-weight: bold; color: #667eea; }
          .amount { font-size: 24px; font-weight: bold; color: #10B981; }
          .status { 
            display: inline-block; 
            padding: 8px 16px; 
            border-radius: 20px; 
            color: white; 
            font-weight: bold;
            margin-top: 10px;
          }
          .status.success { background: #10B981; }
          .status.pending { background: #F59E0B; }
          .status.failed { background: #EF4444; }
          .footer { text-align: center; margin-top: 40px; color: #6B7280; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <h1>💳 Payment Receipt</h1>
            <p>CourseX - Online Learning Platform</p>
          </div>

          <div class="details">
            <div class="row">
              <span class="label">Order ID:</span>
              <span>${payment.orderId}</span>
            </div>

            <div class="row">
              <span class="label">Course:</span>
              <span>${payment.courseId?.title || "N/A"}</span>
            </div>

            <div class="row">
              <span class="label">Amount:</span>
              <span class="amount">₹${payment.amount?.toFixed(2) || "0.00"}</span>
            </div>

            <div class="row">
              <span class="label">Payment Method:</span>
              <span>${payment.paymentMethod}</span>
            </div>

            <div class="row">
              <span class="label">Date:</span>
              <span>${new Date(payment.createdAt).toLocaleString()}</span>
            </div>

            <div class="row">
              <span class="label">Status:</span>
              <span class="status ${payment.status}">${payment.status.toUpperCase()}</span>
            </div>

            ${payment.completedAt ? `
            <div class="row">
              <span class="label">Completed:</span>
              <span>${new Date(payment.completedAt).toLocaleString()}</span>
            </div>
            ` : ""}

            ${payment.paymentId ? `
            <div class="row">
              <span class="label">Payment ID:</span>
              <span>${payment.paymentId}</span>
            </div>
            ` : ""}
          </div>

          <div class="footer">
            <p>This is an automatically generated receipt. For any queries, contact support.</p>
            <p>&copy; 2024 CourseX. All rights reserved.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write(receiptHTML);
    printWindow.document.close();
    printWindow.print();

    window.addToast?.("Receipt opened in print view", "success");
  };

  const handleRequestRefund = async () => {
    if (!refundReason.trim()) {
      window.addToast?.("Please provide a reason for refund", "warning", 3000);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/payments/refund/request",
        {
          paymentId: selectedPayment._id,
          reason: refundReason,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      window.addToast?.(
        "Refund request submitted successfully",
        "success",
        3000
      );

      setRefundModal(false);
      setRefundReason("");
      setSelectedPayment(null);
      fetchPaymentHistory();
    } catch (error) {
      window.addToast?.(
        error.response?.data?.message || "Error submitting refund request",
        "error",
        3000
      );
    }
  };

  const downloadReceiptPDF = (payment) => {
    // This would require a PDF library - for now, we'll use the print functionality
    generateReceipt(payment);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "#10B981";
      case "failed":
        return "#EF4444";
      case "pending":
        return "#F59E0B";
      default:
        return "#6B7280";
    }
  };

  const getStatusIcon = (status) => {
    const icons = { success: "✓", failed: "✕", pending: "⏳" };
    return icons[status] || "?";
  };

  if (loading) {
    return (
      <div className="payment-history-container">
        <Loading fullPage={true} />
      </div>
    );
  }

  return (
    <div className="payment-history-container">
      <div className="payment-history-header">
        <h1>💳 Payment History</h1>
        <p>View and download your payment receipts</p>
      </div>

      {/* STATS OVERVIEW */}
      <div className="payment-stats">
        <div className="stat">
          <span className="stat-label">Total Spent</span>
          <span className="stat-value">
            ₹
            {payments
              .filter((p) => p.status === "success")
              .reduce((sum, p) => sum + (p.amount || 0), 0)
              .toFixed(2)}
          </span>
        </div>

        <div className="stat">
          <span className="stat-label">Courses Purchased</span>
          <span className="stat-value">
            {payments.filter((p) => p.status === "success").length}
          </span>
        </div>

        <div className="stat">
          <span className="stat-label">Pending Payments</span>
          <span className="stat-value">
            {payments.filter((p) => p.status === "pending").length}
          </span>
        </div>
      </div>

      {/* FILTERS */}
      <div className="payment-filters">
        <input
          type="text"
          placeholder="Search by course or order ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Status</option>
          <option value="success">✓ Successful</option>
          <option value="pending">⏳ Pending</option>
          <option value="failed">✕ Failed</option>
        </select>

        <button
          className="reset-btn"
          onClick={() => {
            setSearchTerm("");
            setFilterStatus("all");
          }}
        >
          Reset
        </button>
      </div>

      {/* PAYMENTS LIST */}
      {filteredPayments.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">💼</div>
          <h2>No Payments Found</h2>
          <p>You haven't made any payments yet. Start learning today!</p>
        </div>
      ) : (
        <div className="payments-list">
          {filteredPayments.map((payment) => (
            <div key={payment._id} className="payment-card">
              <div className="payment-card-header">
                <div className="payment-course">
                  <h3>{payment.courseId?.title || "Unknown Course"}</h3>
                  <p className="order-id">Order: {payment.orderId?.slice(0, 16)}...</p>
                </div>

                <span
                  className="status-badge"
                  style={{ backgroundColor: getStatusColor(payment.status) }}
                >
                  {getStatusIcon(payment.status)} {payment.status}
                </span>
              </div>

              <div className="payment-card-body">
                <div className="payment-info">
                  <div className="info-item">
                    <span className="label">Amount Paid:</span>
                    <span className="value amount">₹{payment.amount?.toFixed(2)}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Payment Method:</span>
                    <span className="value">{payment.paymentMethod}</span>
                  </div>

                  <div className="info-item">
                    <span className="label">Date:</span>
                    <span className="value">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="payment-card-footer">
                <button
                  className="btn-view-details"
                  onClick={() => setSelectedPayment(payment)}
                >
                  View Details
                </button>

                {payment.status === "success" && (
                  <button
                    className="btn-download"
                    onClick={() => downloadReceiptPDF(payment)}
                  >
                    📥 Download Receipt
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYMENT DETAIL MODAL */}
      {selectedPayment && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedPayment(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-header">
              <h2>Payment Details</h2>
              <button
                className="modal-close"
                onClick={() => setSelectedPayment(null)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="detail-row">
                <label>Order ID:</label>
                <span>{selectedPayment.orderId}</span>
              </div>

              <div className="detail-row">
                <label>Course:</label>
                <span>{selectedPayment.courseId?.title}</span>
              </div>

              <div className="detail-row">
                <label>Amount:</label>
                <span className="highlight">
                  ₹{selectedPayment.amount?.toFixed(2)}
                </span>
              </div>

              <div className="detail-row">
                <label>Status:</label>
                <span
                  className="status-badge"
                  style={{
                    backgroundColor: getStatusColor(selectedPayment.status),
                  }}
                >
                  {getStatusIcon(selectedPayment.status)}{" "}
                  {selectedPayment.status}
                </span>
              </div>

              <div className="detail-row">
                <label>Payment Date:</label>
                <span>
                  {new Date(selectedPayment.createdAt).toLocaleString()}
                </span>
              </div>

              {selectedPayment.completedAt && (
                <div className="detail-row">
                  <label>Completed:</label>
                  <span>
                    {new Date(selectedPayment.completedAt).toLocaleString()}
                  </span>
                </div>
              )}

              <div className="detail-row">
                <label>Payment Method:</label>
                <span>{selectedPayment.paymentMethod}</span>
              </div>

              {selectedPayment.paymentId && (
                <div className="detail-row">
                  <label>Payment ID:</label>
                  <span>{selectedPayment.paymentId}</span>
                </div>
              )}

              {selectedPayment.failureReason && (
                <div className="detail-row error-row">
                  <label>Failure Reason:</label>
                  <span>{selectedPayment.failureReason}</span>
                </div>
              )}

              {/* REFUND SECTION */}
              {selectedPayment.refundStatus && selectedPayment.refundStatus !== "none" && (
                <>
                  <hr style={{ margin: "15px 0", borderColor: "#e0e0e0" }} />
                  <div className="detail-row">
                    <label>Refund Status:</label>
                    <span
                      style={{
                        backgroundColor:
                          selectedPayment.refundStatus === "pending"
                            ? "#F59E0B"
                            : selectedPayment.refundStatus === "completed"
                            ? "#10B981"
                            : "#EF4444",
                        color: "white",
                        padding: "5px 10px",
                        borderRadius: "5px",
                        fontSize: "12px",
                        fontWeight: "bold",
                      }}
                    >
                      {selectedPayment.refundStatus.toUpperCase()}
                    </span>
                  </div>

                  {selectedPayment.refundReason && (
                    <div className="detail-row">
                      <label>Reason:</label>
                      <span>{selectedPayment.refundReason}</span>
                    </div>
                  )}

                  {selectedPayment.refundRequestedAt && (
                    <div className="detail-row">
                      <label>Requested:</label>
                      <span>
                        {new Date(selectedPayment.refundRequestedAt).toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="modal-footer">
              {selectedPayment.status === "success" &&
                selectedPayment.refundStatus === "none" && (
                  <button
                    className="btn-primary"
                    onClick={() => setRefundModal(true)}
                    style={{ backgroundColor: "#f5576c" }}
                  >
                    🔄 Request Refund
                  </button>
                )}

              {selectedPayment.status === "success" && (
                <button
                  className="btn-primary"
                  onClick={() => {
                    downloadReceiptPDF(selectedPayment);
                    setSelectedPayment(null);
                  }}
                >
                  📥 Download Receipt
                </button>
              )}

              <button
                className="btn-secondary"
                onClick={() => setSelectedPayment(null)}
              >
                Close
              </button>
            </div>

            {/* REFUND REQUEST MODAL */}
            {refundModal && (
              <div
                className="modal-overlay"
                onClick={() => setRefundModal(false)}
              >
                <div
                  className="modal-content"
                  style={{ width: "400px", maxWidth: "90%" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="modal-header">
                    <h3>Request Refund</h3>
                    <button
                      className="modal-close"
                      onClick={() => setRefundModal(false)}
                    >
                      ✕
                    </button>
                  </div>

                  <div className="modal-body">
                    <p style={{ marginBottom: "15px", fontSize: "14px" }}>
                      You can request a refund within 7 days of purchase. Please provide a reason for your refund request.
                    </p>

                    <div style={{ marginBottom: "15px" }}>
                      <label
                        style={{
                          display: "block",
                          marginBottom: "8px",
                          fontWeight: "500",
                          fontSize: "13px",
                        }}
                      >
                        Reason for Refund:
                      </label>
                      <textarea
                        value={refundReason}
                        onChange={(e) =>
                          setRefundReason(e.target.value)
                        }
                        placeholder="Please tell us why you want to request a refund..."
                        style={{
                          width: "100%",
                          minHeight: "100px",
                          padding: "10px",
                          border: "1px solid #ddd",
                          borderRadius: "5px",
                          fontFamily: "inherit",
                          fontSize: "13px",
                          resize: "vertical",
                        }}
                      />
                    </div>

                    <p
                      style={{
                        fontSize: "12px",
                        color: "#666",
                        backgroundColor: "#f5f5f5",
                        padding: "10px",
                        borderRadius: "5px",
                      }}
                    >
                      ⚠️ Upon approval, you will be unenrolled from the course and a refund of ₹{selectedPayment.amount} will be processed.
                    </p>
                  </div>

                  <div
                    className="modal-footer"
                    style={{ display: "flex", gap: "10px" }}
                  >
                    <button
                      className="btn-secondary"
                      onClick={() => setRefundModal(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="btn-primary"
                      onClick={handleRequestRefund}
                    >
                      Submit Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
