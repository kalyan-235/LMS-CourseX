/**
 * Mock Payment API Service
 * Used for development and testing without hitting real Razorpay
 */

// Simulate network delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock payment database (in-memory)
const mockPayments = new Map();
const mockOrders = new Map();

export const mockPaymentAPI = {
  /**
   * Create a mock payment order
   */
  createMockOrder: async (courseId, amount) => {
    await delay(800); // Simulate network delay

    const orderId = `order_mock_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const paymentId = `pay_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const orderData = {
      orderId,
      amount,
      courseId,
      paymentId,
      status: "created",
      createdAt: new Date(),
    };

    mockOrders.set(orderId, orderData);

    return {
      success: true,
      data: {
        orderId,
        amount,
        key: "rzp_test_1234567890abcd", // Mock test key
        paymentId,
      },
    };
  },

  /**
   * Verify a mock payment
   */
  verifyMockPayment: async (orderId, paymentId, signature) => {
    await delay(1200); // Simulate verification delay

    const order = mockOrders.get(orderId);

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    // Mock payment verification (always succeeds in mock mode)
    const paymentData = {
      orderId,
      paymentId,
      signature,
      status: "verified",
      verifiedAt: new Date(),
      razorpayOrderId: orderId,
      razorpayPaymentId: paymentId,
      razorpaySignature: signature,
    };

    mockPayments.set(paymentId, paymentData);
    mockOrders.set(orderId, { ...order, status: "verified" });

    return {
      success: true,
      data: {
        paymentId,
        orderId,
        status: "captured",
        message: "Mock payment verified successfully",
      },
    };
  },

  /**
   * Get mock payment status
   */
  getMockPaymentStatus: async (paymentId) => {
    await delay(500);

    const payment = mockPayments.get(paymentId);

    if (!payment) {
      return {
        success: false,
        error: "Payment not found",
      };
    }

    return {
      success: true,
      data: {
        paymentId,
        status: payment.status,
        verifiedAt: payment.verifiedAt,
        amount: payment.amount,
      },
    };
  },

  /**
   * Simulate payment failure (for testing error handling)
   */
  simulatePaymentFailure: async (orderId) => {
    await delay(1200);

    const order = mockOrders.get(orderId);

    if (!order) {
      return {
        success: false,
        error: "Order not found",
      };
    }

    mockOrders.set(orderId, { ...order, status: "failed" });

    return {
      success: false,
      error: "Mock payment failed - Testing error handling",
    };
  },

  /**
   * Reset mock payment database (for testing)
   */
  resetMockDatabase: () => {
    mockPayments.clear();
    mockOrders.clear();
    console.log("Mock payment database reset");
  },

  /**
   * Get all mock payments (for debugging)
   */
  getAllMockPayments: () => {
    return {
      orders: Array.from(mockOrders.values()),
      payments: Array.from(mockPayments.values()),
    };
  },

  /**
   * Test payment with customizable response
   */
  testPaymentFlow: async (config = {}) => {
    const {
      courseId = "test-course-id",
      amount = 999,
      shouldFail = false,
      delayMs = 1000,
    } = config;

    await delay(delayMs);

    if (shouldFail) {
      return {
        success: false,
        error: "Payment processing failed",
      };
    }

    const orderId = `order_test_${Date.now()}`;
    const paymentId = `pay_test_${Date.now()}`;

    return {
      success: true,
      data: {
        orderId,
        paymentId,
        amount,
        courseId,
        timestamp: new Date(),
      },
    };
  },
};

export default mockPaymentAPI;
