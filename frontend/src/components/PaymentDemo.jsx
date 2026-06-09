import { useState } from "react";
import mockPaymentAPI from "../api/mockPaymentAPI";
import "../css/paymentdemo.css";

/**
 * PaymentDemo Component
 * A testing/development component to test mock payment flows
 */
export default function PaymentDemo() {
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(null);

  const addTestResult = (title, result, status = "success") => {
    const newResult = {
      id: Date.now(),
      title,
      result,
      status,
      timestamp: new Date().toLocaleTimeString(),
    };
    setTestResults(prev => [newResult, ...prev]);
  };

  const testCreateOrder = async () => {
    setLoading(true);
    try {
      const response = await mockPaymentAPI.createMockOrder("test-course-123", 999);
      setOrderCreated(response.data);
      addTestResult("Create Mock Order", JSON.stringify(response.data, null, 2), "success");
    } catch (error) {
      addTestResult("Create Mock Order", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const testVerifyPayment = async () => {
    if (!orderCreated) {
      addTestResult("Verify Payment", "Create an order first!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await mockPaymentAPI.verifyMockPayment(
        orderCreated.orderId,
        orderCreated.paymentId,
        "mock_signature_123"
      );
      addTestResult("Verify Mock Payment", JSON.stringify(response.data, null, 2), "success");
    } catch (error) {
      addTestResult("Verify Mock Payment", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const testPaymentFlow = async () => {
    setLoading(true);
    try {
      const response = await mockPaymentAPI.testPaymentFlow({
        courseId: "demo-course",
        amount: 1299,
        shouldFail: false,
        delayMs: 1500,
      });
      addTestResult("Full Payment Flow", JSON.stringify(response.data, null, 2), "success");
    } catch (error) {
      addTestResult("Full Payment Flow", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const testFailureScenario = async () => {
    setLoading(true);
    try {
      const response = await mockPaymentAPI.testPaymentFlow({
        courseId: "demo-course",
        amount: 1299,
        shouldFail: true,
        delayMs: 1000,
      });
      addTestResult("Failure Scenario", JSON.stringify(response, null, 2), "error");
    } catch (error) {
      addTestResult("Failure Scenario", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const getPaymentStatus = async () => {
    if (!orderCreated) {
      addTestResult("Get Payment Status", "Create an order first!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await mockPaymentAPI.getMockPaymentStatus(orderCreated.paymentId);
      addTestResult("Get Payment Status", JSON.stringify(response.data, null, 2), "success");
    } catch (error) {
      addTestResult("Get Payment Status", error.message, "error");
    } finally {
      setLoading(false);
    }
  };

  const viewAllMocks = () => {
    const data = mockPaymentAPI.getAllMockPayments();
    addTestResult("All Mock Payments", JSON.stringify(data, null, 2), "success");
  };

  const resetDatabase = () => {
    mockPaymentAPI.resetMockDatabase();
    setOrderCreated(null);
    addTestResult("Database Reset", "Mock payment database cleared", "success");
  };

  const clearResults = () => {
    setTestResults([]);
  };

  return (
    <div className="payment-demo-container">
      <div className="demo-header">
        <h1>🧪 Payment System Demo</h1>
        <p>Test mock payment flows and integration</p>
      </div>

      <div className="demo-layout">
        {/* Control Panel */}
        <div className="demo-controls">
          <h2>Test Controls</h2>

          <div className="control-section">
            <h3>Order Management</h3>
            <button
              className="demo-btn primary"
              onClick={testCreateOrder}
              disabled={loading}
            >
              {loading ? "⏳" : "✓"} Create Mock Order
            </button>
            {orderCreated && (
              <div className="order-info">
                <p><strong>Order ID:</strong> {orderCreated.orderId}</p>
                <p><strong>Payment ID:</strong> {orderCreated.paymentId}</p>
              </div>
            )}
          </div>

          <div className="control-section">
            <h3>Payment Verification</h3>
            <button
              className="demo-btn primary"
              onClick={testVerifyPayment}
              disabled={loading || !orderCreated}
            >
              {loading ? "⏳" : "✓"} Verify Payment
            </button>
            <button
              className="demo-btn secondary"
              onClick={getPaymentStatus}
              disabled={loading || !orderCreated}
            >
              {loading ? "⏳" : "ℹ️"} Get Status
            </button>
          </div>

          <div className="control-section">
            <h3>Full Flow Tests</h3>
            <button
              className="demo-btn primary"
              onClick={testPaymentFlow}
              disabled={loading}
            >
              {loading ? "⏳" : "🚀"} Complete Flow
            </button>
            <button
              className="demo-btn warning"
              onClick={testFailureScenario}
              disabled={loading}
            >
              {loading ? "⏳" : "❌"} Test Failure
            </button>
          </div>

          <div className="control-section">
            <h3>Utilities</h3>
            <button
              className="demo-btn secondary"
              onClick={viewAllMocks}
              disabled={loading}
            >
              📊 View All Payments
            </button>
            <button
              className="demo-btn danger"
              onClick={resetDatabase}
              disabled={loading}
            >
              🔄 Reset Database
            </button>
            <button
              className="demo-btn secondary"
              onClick={clearResults}
              disabled={loading}
            >
              🗑️ Clear Results
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="demo-results">
          <h2>Test Results ({testResults.length})</h2>
          {testResults.length === 0 ? (
            <div className="empty-results">
              <p>No test results yet. Click buttons to start testing!</p>
            </div>
          ) : (
            <div className="results-list">
              {testResults.map(result => (
                <div key={result.id} className={`result-item ${result.status}`}>
                  <div className="result-header">
                    <h4>{result.title}</h4>
                    <span className="result-time">{result.timestamp}</span>
                  </div>
                  <pre className="result-body">{result.result}</pre>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
