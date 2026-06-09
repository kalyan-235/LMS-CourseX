import { useEffect, useState } from "react";
import API from "../../api/axios";
import Loading from "../../components/Loading";
import AdminLayout from "../layouts/AdminLayout";
import "../css/admin-payments.css";

export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalPayments: 0,
    successfulPayments: 0,
    failedPayments: 0,
    pendingPayments: 0,
    refundRequests: 0,
  });
  const [refundAction, setRefundAction] = useState(null);
  const [filters, setFilters] = useState({
    status: "all",
    searchTerm: "",
    startDate: "",
    endDate: "",
  });
  const [sortBy, setSortBy] = useState("date-desc");

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const res = await API.get("/payments/all", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const paymentData = res.data || [];
      setPayments(paymentData);
      calculateStats(paymentData);
    } catch (err) {
      console.log("Error fetching payments:", err);
      window.addToast?.("Failed to load payments", "error");
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (data) => {
    const stats = {
      totalRevenue: 0,
      totalPayments: data.length,
      successfulPayments: 0,
      failedPayments: 0,
      pendingPayments: 0,
      refundRequests: 0,
    };

    data.forEach((payment) => {
      if (payment.status === "success") {
        stats.successfulPayments++;
        stats.totalRevenue += payment.amount || 0;
      } else if (payment.status === "failed") {
        stats.failedPayments++;
      } else {
        stats.pendingPayments++;
      }

      if (payment.refundStatus === "pending") {
        stats.refundRequests++;
      }
    });

    setStats(stats);
  };

  const filteredPayments = payments
    .filter((payment) => {
      if (filters.status !== "all" && payment.status !== filters.status) {
        return false;
      }

      if (filters.searchTerm) {
        const searchLower = filters.searchTerm.toLowerCase();
        const matches =
          payment.userId?.name?.toLowerCase().includes(searchLower) ||
          payment.userId?.email?.toLowerCase().includes(searchLower) ||
          payment.courseId?.title?.toLowerCase().includes(searchLower) ||
          payment.orderId?.includes(searchLower);
        return matches;
      }

      if (filters.startDate) {
        const paymentDate = new Date(payment.createdAt);
        if (paymentDate < new Date(filters.startDate)) {
          return false;
        }
      }

      if (filters.endDate) {
        const paymentDate = new Date(payment.createdAt);
        if (paymentDate > new Date(filters.endDate)) {
          return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "date-asc":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "amount-desc":
          return (b.amount || 0) - (a.amount || 0);
        case "amount-asc":
          return (a.amount || 0) - (b.amount || 0);
        default:
          return 0;
      }
    });

  const exportToCSV = () => {
    const headers = [
      "Order ID",
      "Student Name",
      "Email",
      "Course",
      "Amount",
      "Status",
      "Date",
    ];
    const rows = filteredPayments.map((p) => [
      p.orderId,
      p.userId?.name || "N/A",
      p.userId?.email || "N/A",
      p.courseId?.title || "N/A",
      `₹${p.amount || 0}`,
      p.status,
      new Date(p.createdAt).toLocaleDateString(),
    ]);

    let csv = headers.join(",") + "\n";
    rows.forEach((row) => {
      csv += row.map((cell) => `"${cell}"`).join(",") + "\n";
    });

    const link = document.createElement("a");
    link.href = "data:text/csv;charset=utf-8," + encodeURIComponent(csv);
    link.download = `payments_${new Date().toISOString().split("T")[0]}.csv`;
    link.click();

    window.addToast?.("CSV exported successfully", "success");
  };

  const handleRefund = async (approve) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post(
        "/payments/refund/process",
        {
          paymentId: selectedPayment._id,
          approve,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.addToast(
        approve
          ? "Refund approved successfully!"
          : "Refund rejected",
        approve ? "success" : "info",
        3000
      );

      setRefundAction(null);
      setSelectedPayment(null);
      fetchPayments();
    } catch (error) {
      window.addToast(
        error.response?.data?.message ||
          "Error processing refund",
        "error",
        3000
      );
    }
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

  const getStatusBadge = (status) => {
    const icons = {
      success: "✓",
      failed: "✕",
      pending: "⏳",
    };
    return icons[status] || "?";
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loading fullPage={false} />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="admin-payments-container">
        <div className="admin-header">
          <h1>💳 Payment Management</h1>
          <button className="btn-primary" onClick={exportToCSV}>
            📥 Export CSV
          </button>
        </div>

        {/* STATISTICS CARDS */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>Total Revenue</h3>
              <p className="stat-value">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <h3>Total Payments</h3>
              <p className="stat-value">{stats.totalPayments}</p>
            </div>
          </div>

          <div className="stat-card success">
            <div className="stat-icon">✓</div>
            <div className="stat-content">
              <h3>Successful</h3>
              <p className="stat-value">{stats.successfulPayments}</p>
            </div>
          </div>

          <div className="stat-card warning">
            <div className="stat-icon">⏳</div>
            <div className="stat-content">
              <h3>Pending</h3>
              <p className="stat-value">{stats.pendingPayments}</p>
            </div>
          </div>

          <div className="stat-card error">
            <div className="stat-icon">✕</div>
            <div className="stat-content">
              <h3>Failed</h3>
              <p className="stat-value">{stats.failedPayments}</p>
            </div>
          </div>

          <div className="stat-card" style={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" }}>
            <div className="stat-icon">🔄</div>
            <div className="stat-content">
              <h3>Refund Requests</h3>
              <p className="stat-value">{stats.refundRequests}</p>
            </div>
          </div>
        </div>

        {/* FILTERS & SEARCH */}
        <div className="filters-section">
          <div className="filter-group">
            <input
              type="text"
              placeholder="Search by student, email, course, or order ID..."
              value={filters.searchTerm}
              onChange={(e) =>
                setFilters({ ...filters, searchTerm: e.target.value })
              }
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <select
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
              className="filter-select"
            >
              <option value="all">All Status</option>
              <option value="success">✓ Successful</option>
              <option value="pending">⏳ Pending</option>
              <option value="failed">✕ Failed</option>
            </select>
          </div>

          <div className="filter-group">
            <input
              type="date"
              value={filters.startDate}
              onChange={(e) =>
                setFilters({ ...filters, startDate: e.target.value })
              }
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <input
              type="date"
              value={filters.endDate}
              onChange={(e) =>
                setFilters({ ...filters, endDate: e.target.value })
              }
              className="filter-input"
            />
          </div>

          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="date-desc">Latest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="amount-desc">Highest Amount</option>
              <option value="amount-asc">Lowest Amount</option>
            </select>
          </div>

          <button
            className="btn-secondary"
            onClick={() =>
              setFilters({
                status: "all",
                searchTerm: "",
                startDate: "",
                endDate: "",
              })
            }
          >
            Clear Filters
          </button>
        </div>

        {/* PAYMENTS TABLE */}
        {filteredPayments.length === 0 ? (
          <div className="empty-state">
            <p>📭 No payments found</p>
          </div>
        ) : (
          <div className="payments-table-wrapper">
            <table className="payments-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Student</th>
                  <th>Course</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment._id} className="payment-row">
                    <td className="order-id">{payment.orderId?.slice(0, 12)}...</td>
                    <td>
                      <div className="student-info">
                        <p className="student-name">{payment.userId?.name}</p>
                        <p className="student-email">{payment.userId?.email}</p>
                      </div>
                    </td>
                    <td className="course-title">{payment.courseId?.title}</td>
                    <td className="amount">₹{payment.amount?.toFixed(2) || "0.00"}</td>
                    <td>
                      <span
                        className="status-badge"
                        style={{
                          backgroundColor: getStatusColor(payment.status),
                        }}
                      >
                        {getStatusBadge(payment.status)} {payment.status}
                      </span>
                    </td>
                    <td className="date">
                      {new Date(payment.createdAt).toLocaleDateString()}
                    </td>
                    <td>
                      <button
                        className="btn-view"
                        onClick={() => setSelectedPayment(payment)}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* PAYMENT DETAIL MODAL */}
        {selectedPayment && (
          <div className="modal-overlay" onClick={() => setSelectedPayment(null)}>
            <div className="modal-content payment-modal" onClick={(e) => e.stopPropagation()}>
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
                  <label>Student Name:</label>
                  <span>{selectedPayment.userId?.name}</span>
                </div>

                <div className="detail-row">
                  <label>Student Email:</label>
                  <span>{selectedPayment.userId?.email}</span>
                </div>

                <div className="detail-row">
                  <label>Course:</label>
                  <span>{selectedPayment.courseId?.title}</span>
                </div>

                <div className="detail-row">
                  <label>Amount:</label>
                  <span className="highlight">₹{selectedPayment.amount?.toFixed(2)}</span>
                </div>

                <div className="detail-row">
                  <label>Status:</label>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: getStatusColor(selectedPayment.status),
                    }}
                  >
                    {getStatusBadge(selectedPayment.status)}{" "}
                    {selectedPayment.status}
                  </span>
                </div>

                <div className="detail-row">
                  <label>Payment ID:</label>
                  <span>{selectedPayment.paymentId || "N/A"}</span>
                </div>

                <div className="detail-row">
                  <label>Created:</label>
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

                {selectedPayment.failureReason && (
                  <div className="detail-row error">
                    <label>Failure Reason:</label>
                    <span>{selectedPayment.failureReason}</span>
                  </div>
                )}

                <div className="detail-row">
                  <label>Payment Method:</label>
                  <span>{selectedPayment.paymentMethod}</span>
                </div>

                <div className="detail-row">
                  <label>Currency:</label>
                  <span>{selectedPayment.currency}</span>
                </div>

                {/* REFUND SECTION */}
                {selectedPayment.refundStatus && selectedPayment.refundStatus !== "none" && (
                  <>
                    <hr style={{ margin: "15px 0", borderColor: "#e0e0e0" }} />
                    <div className="detail-row">
                      <label>Refund Status:</label>
                      <span
                        style={{
                          backgroundColor:
                            selectedPayment.refundStatus ===
                            "pending"
                              ? "#F59E0B"
                              : selectedPayment.refundStatus ===
                                  "completed"
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
                        <label>Refund Reason:</label>
                        <span>{selectedPayment.refundReason}</span>
                      </div>
                    )}

                    {selectedPayment.refundRequestedAt && (
                      <div className="detail-row">
                        <label>Requested:</label>
                        <span>
                          {new Date(
                            selectedPayment.refundRequestedAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {selectedPayment.refundProcessedAt && (
                      <div className="detail-row">
                        <label>Processed:</label>
                        <span>
                          {new Date(
                            selectedPayment.refundProcessedAt
                          ).toLocaleString()}
                        </span>
                      </div>
                    )}

                    {/* REFUND ACTION BUTTONS */}
                    {selectedPayment.refundStatus ===
                      "pending" && (
                      <div className="detail-row" style={{ gap: "10px" }}>
                        <button
                          className="btn-primary"
                          onClick={() =>
                            setRefundAction(
                              "approve"
                            )
                          }
                          style={{
                            flex: 1,
                            backgroundColor:
                              "#10B981",
                          }}
                        >
                          ✓ Approve Refund
                        </button>
                        <button
                          className="btn-primary"
                          onClick={() =>
                            setRefundAction("reject")
                          }
                          style={{
                            flex: 1,
                            backgroundColor:
                              "#EF4444",
                          }}
                        >
                          ✕ Reject Refund
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>

              {/* REFUND CONFIRMATION MODAL */}
              {refundAction && (
                <div
                  className="modal-overlay"
                  onClick={() =>
                    setRefundAction(null)
                  }
                >
                  <div
                    className="modal-content"
                    style={{
                      width: "400px",
                      maxWidth: "90%",
                    }}
                    onClick={(e) =>
                      e.stopPropagation()
                    }
                  >
                    <div
                      className="modal-header"
                      style={{
                        borderBottom:
                          "1px solid #e0e0e0",
                      }}
                    >
                      <h3>
                        {refundAction ===
                        "approve"
                          ? "Confirm Refund Approval"
                          : "Confirm Refund Rejection"}
                      </h3>
                    </div>

                    <div
                      className="modal-body"
                      style={{
                        padding: "20px",
                      }}
                    >
                      <p style={{ marginBottom: "15px" }}>
                        {refundAction ===
                        "approve"
                          ? `Are you sure you want to approve this refund of ₹${selectedPayment.amount}? The student will be unenrolled from the course.`
                          : `Are you sure you want to reject this refund request?`}
                      </p>
                    </div>

                    <div
                      className="modal-footer"
                      style={{
                        borderTop:
                          "1px solid #e0e0e0",
                        display: "flex",
                        gap: "10px",
                      }}
                    >
                      <button
                        className="btn-secondary"
                        onClick={() =>
                          setRefundAction(null)
                        }
                      >
                        Cancel
                      </button>
                      <button
                        className="btn-primary"
                        style={{
                          backgroundColor:
                            refundAction ===
                            "approve"
                              ? "#10B981"
                              : "#EF4444",
                        }}
                        onClick={() =>
                          handleRefund(
                            refundAction ===
                              "approve"
                          )
                        }
                      >
                        {refundAction ===
                        "approve"
                          ? "Approve Refund"
                          : "Reject Refund"}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
