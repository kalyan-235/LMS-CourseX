/**
 * Payment Testing Utilities
 * Helper functions for testing payment flows in automated tests or development
 */

import mockPaymentAPI from './mockPaymentAPI';

export const paymentTestUtils = {
  /**
   * Complete test flow simulation
   * Tests the entire payment process from creation to verification
   */
  runCompletePaymentTest: async (courseId = 'test-course', amount = 999) => {
    console.log('🧪 Starting complete payment test...');
    
    try {
      // Step 1: Create order
      console.log('📝 Creating mock order...');
      const orderResponse = await mockPaymentAPI.createMockOrder(courseId, amount);
      const { orderId, paymentId } = orderResponse.data;
      console.log(`✓ Order created: ${orderId}`);

      // Step 2: Verify payment
      console.log('🔐 Verifying mock payment...');
      const verifyResponse = await mockPaymentAPI.verifyMockPayment(
        orderId,
        paymentId,
        'test_signature_123'
      );
      console.log('✓ Payment verified');

      // Step 3: Check status
      console.log('📊 Checking payment status...');
      const statusResponse = await mockPaymentAPI.getMockPaymentStatus(paymentId);
      console.log('✓ Status retrieved:', statusResponse.data.status);

      return {
        success: true,
        orderId,
        paymentId,
        amount,
        courseId,
        results: {
          order: orderResponse.data,
          verification: verifyResponse.data,
          status: statusResponse.data,
        },
      };
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  },

  /**
   * Test multiple payments sequentially
   */
  runBatchPaymentTests: async (count = 3, courseIds = []) => {
    console.log(`🔄 Running batch test with ${count} payments...`);
    const results = [];

    for (let i = 0; i < count; i++) {
      const courseId = courseIds[i] || `course-${i + 1}`;
      const amount = 999 + (i * 100);
      
      console.log(`\n--- Payment ${i + 1}/${count} ---`);
      const result = await this.runCompletePaymentTest(courseId, amount);
      results.push(result);
    }

    return {
      totalTests: count,
      successfulTests: results.filter(r => r.success).length,
      failedTests: results.filter(r => !r.success).length,
      results,
    };
  },

  /**
   * Stress test - rapid fire orders
   */
  stressTest: async (numberOfOrders = 10, delayBetweenOrders = 100) => {
    console.log(`⚡ Starting stress test with ${numberOfOrders} orders...`);
    const results = [];
    const startTime = Date.now();

    for (let i = 0; i < numberOfOrders; i++) {
      try {
        const response = await mockPaymentAPI.createMockOrder(
          `stress-test-${i}`,
          999
        );
        results.push({
          index: i,
          success: true,
          orderId: response.data.orderId,
        });

        if (delayBetweenOrders > 0) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenOrders));
        }
      } catch (error) {
        results.push({
          index: i,
          success: false,
          error: error.message,
        });
      }
    }

    const endTime = Date.now();
    const duration = endTime - startTime;

    return {
      totalOrders: numberOfOrders,
      successfulOrders: results.filter(r => r.success).length,
      failedOrders: results.filter(r => !r.success).length,
      duration,
      avgTimePerOrder: duration / numberOfOrders,
      results,
    };
  },

  /**
   * Validate payment data structure
   */
  validatePaymentData: (paymentData) => {
    const required = ['orderId', 'paymentId', 'amount', 'courseId'];
    const missing = required.filter(field => !paymentData[field]);

    if (missing.length > 0) {
      return {
        valid: false,
        missingFields: missing,
      };
    }

    return {
      valid: true,
      fields: Object.keys(paymentData),
    };
  },

  /**
   * Generate test report
   */
  generateTestReport: () => {
    const allPayments = mockPaymentAPI.getAllMockPayments();
    const { orders, payments } = allPayments;

    const report = {
      summary: {
        totalOrders: orders.length,
        totalPayments: payments.length,
        verifiedPayments: payments.filter(p => p.status === 'verified').length,
        failedOrders: orders.filter(o => o.status === 'failed').length,
      },
      orders: orders.map(o => ({
        id: o.orderId,
        status: o.status,
        amount: o.amount,
        courseId: o.courseId,
      })),
      payments: payments.map(p => ({
        id: p.paymentId,
        status: p.status,
        orderId: p.orderId,
        verifiedAt: p.verifiedAt,
      })),
      timestamp: new Date(),
    };

    console.log('📊 Test Report Generated');
    console.table(report.summary);

    return report;
  },

  /**
   * Export test data as JSON
   */
  exportTestData: () => {
    const data = mockPaymentAPI.getAllMockPayments();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `payment-test-data-${Date.now()}.json`;
    link.click();

    console.log('✓ Data exported');
    return data;
  },

  /**
   * Import test data from JSON
   */
  importTestData: (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      // This would need backend integration to actually import
      console.log('📥 Test data imported:', data);
      return { success: true, data };
    } catch (error) {
      console.error('❌ Import failed:', error.message);
      return { success: false, error: error.message };
    }
  },

  /**
   * Clear all test data and start fresh
   */
  resetTestEnvironment: () => {
    mockPaymentAPI.resetMockDatabase();
    console.log('🔄 Test environment reset');
    return { success: true, message: 'All test data cleared' };
  },

  /**
   * Performance benchmark
   */
  benchmarkPaymentFlow: async (iterations = 10) => {
    console.log(`⏱️ Benchmarking payment flow (${iterations} iterations)...`);
    
    const times = [];

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      
      await mockPaymentAPI.createMockOrder(`bench-${i}`, 999);
      
      const end = performance.now();
      times.push(end - start);
    }

    const avgTime = times.reduce((a, b) => a + b, 0) / times.length;
    const minTime = Math.min(...times);
    const maxTime = Math.max(...times);

    const benchmark = {
      iterations,
      avgTime: avgTime.toFixed(2) + 'ms',
      minTime: minTime.toFixed(2) + 'ms',
      maxTime: maxTime.toFixed(2) + 'ms',
      allTimes: times.map(t => t.toFixed(2) + 'ms'),
    };

    console.table(benchmark);
    return benchmark;
  },

  /**
   * Test error scenarios
   */
  testErrorScenarios: async () => {
    console.log('🛡️ Testing error scenarios...');
    
    const results = [];

    // Scenario 1: Invalid order ID
    console.log('- Testing invalid order ID...');
    const invalidOrder = await mockPaymentAPI.getMockPaymentStatus('invalid-id');
    results.push({
      scenario: 'Invalid Order ID',
      success: !invalidOrder.success,
      error: invalidOrder.error,
    });

    // Scenario 2: Payment failure
    console.log('- Testing payment failure...');
    const failedPayment = await mockPaymentAPI.testPaymentFlow({
      shouldFail: true,
    });
    results.push({
      scenario: 'Payment Failure',
      success: !failedPayment.success,
      error: failedPayment.error,
    });

    console.log('✓ Error scenarios tested');
    return results;
  },
};

// Export default for easy importing
export default paymentTestUtils;

// Also export individual functions for direct imports if needed
export const {
  runCompletePaymentTest,
  runBatchPaymentTests,
  stressTest,
  validatePaymentData,
  generateTestReport,
  exportTestData,
  importTestData,
  resetTestEnvironment,
  benchmarkPaymentFlow,
  testErrorScenarios,
} = paymentTestUtils;
