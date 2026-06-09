# Mock Payment System Documentation

## Overview

A complete mock payment testing system for the CourseX LMS platform. This system allows developers to test payment flows without hitting real Razorpay payment gateway.

## Features

✅ **Mock Order Creation** - Create fake payment orders  
✅ **Mock Payment Verification** - Verify mock payments  
✅ **Test Scenarios** - Test success and failure flows  
✅ **Demo Component** - Interactive UI for testing  
✅ **Mock API Service** - Reusable mock payment functions  
✅ **Payment Status Tracking** - Check payment status  
✅ **Database Management** - View and reset mock data  

## Files Included

### 1. **PaymentModal.jsx** (Updated)
The main payment modal component with integrated mock mode support.

**Features:**
- Automatic detection of mock key
- Mock confirmation dialog when in test mode
- Integration with backend payment API

**Usage:**
```jsx
<PaymentModal 
  course={courseData} 
  onClose={handleClose}
  onPaymentSuccess={handleSuccess}
/>
```

### 2. **mockPaymentAPI.js** (New)
Backend-free mock payment API service for development.

**Available Methods:**

#### `createMockOrder(courseId, amount)`
Creates a mock payment order.

```javascript
const response = await mockPaymentAPI.createMockOrder('course-123', 999);
// Returns: { orderId, paymentId, amount, key }
```

#### `verifyMockPayment(orderId, paymentId, signature)`
Verifies a mock payment.

```javascript
const response = await mockPaymentAPI.verifyMockPayment(
  orderId, 
  paymentId, 
  'mock_signature'
);
```

#### `getMockPaymentStatus(paymentId)`
Checks payment status.

```javascript
const response = await mockPaymentAPI.getMockPaymentStatus(paymentId);
// Returns: { status, verifiedAt, amount }
```

#### `testPaymentFlow(config)`
Test complete payment flow with custom configuration.

```javascript
const response = await mockPaymentAPI.testPaymentFlow({
  courseId: 'test-course',
  amount: 999,
  shouldFail: false,
  delayMs: 1000
});
```

#### `resetMockDatabase()`
Clear all mock data.

```javascript
mockPaymentAPI.resetMockDatabase();
```

#### `getAllMockPayments()`
View all mock transactions.

```javascript
const data = mockPaymentAPI.getAllMockPayments();
// Returns: { orders: [], payments: [] }
```

### 3. **PaymentDemo.jsx** (New)
Interactive testing component with visual interface.

**Features:**
- Test order creation
- Test payment verification
- Full flow testing
- Failure scenario testing
- Real-time result display
- Database management

**Usage:**
```jsx
import PaymentDemo from '@/components/PaymentDemo';

// Add to your routes or admin panel
<Route path="/admin/payment-demo" element={<PaymentDemo />} />
```

### 4. **Updated CSS Files**

#### `paymentmodal.css` (Updated)
Added styles for mock payment confirmation dialog:
- `.mock-confirm-overlay` - Overlay styling
- `.mock-confirm-modal` - Modal styling
- `.mock-badge` - Test mode badge
- `.mock-details` - Payment details
- `.mock-warning` - Warning box
- `.mock-actions` - Button styling

#### `paymentdemo.css` (New)
Complete styling for the PaymentDemo component including:
- Control panels
- Result displays
- Button variations
- Responsive design

## Integration Guide

### Step 1: Import Mock API

```javascript
import mockPaymentAPI from '@/api/mockPaymentAPI';
```

### Step 2: Use in Development

The PaymentModal component automatically detects mock mode by checking the API key. If the key is `rzp_test_1234567890abcd`, it switches to mock mode.

### Step 3: Test Payment Flow

```javascript
// Option 1: Use PaymentDemo component
<PaymentDemo />

// Option 2: Use mockPaymentAPI directly
const order = await mockPaymentAPI.createMockOrder('course-id', 999);
const verification = await mockPaymentAPI.verifyMockPayment(
  order.data.orderId,
  order.data.paymentId,
  'test-sig'
);
```

## Configuration

### Backend Setup for Mock Mode

Update your payment controller to detect mock keys:

```javascript
// paymentController.js

export const createOrder = async (req, res) => {
  const courseId = req.body.courseId;
  const course = await Course.findById(courseId);

  // In mock mode, use test key
  const isMockMode = process.env.RAZORPAY_KEY_ID === 'rzp_test_1234567890abcd';

  if (isMockMode) {
    // Return mock order
    return res.json({
      orderId: `order_mock_${Date.now()}`,
      amount: course.price,
      key: 'rzp_test_1234567890abcd',
      paymentId: `pay_${Date.now()}`,
    });
  }

  // Normal Razorpay flow
  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const options = {
    amount: course.price * 100,
    currency: 'INR',
  };

  const order = await instance.orders.create(options);
  // ... rest of implementation
};
```

### Environment Variables

For development, set in `.env`:

```env
# Mock mode
VITE_API_MOCK_MODE=true
RAZORPAY_KEY_ID=rzp_test_1234567890abcd
RAZORPAY_KEY_SECRET=mock_secret

# Production mode
# VITE_API_MOCK_MODE=false
# RAZORPAY_KEY_ID=rzp_live_xxxxx
# RAZORPAY_KEY_SECRET=xxxxx
```

## Testing Scenarios

### Scenario 1: Successful Payment
```javascript
// PaymentModal will automatically show mock confirmation
// Click "Confirm Mock Payment" to complete
```

### Scenario 2: Payment Failure
```javascript
const response = await mockPaymentAPI.testPaymentFlow({
  shouldFail: true
});
// Will return error response
```

### Scenario 3: Custom Amount
```javascript
const response = await mockPaymentAPI.testPaymentFlow({
  amount: 2999,
  courseId: 'premium-course'
});
```

## Debug Commands

### In Browser Console

```javascript
// Import the API
import mockPaymentAPI from '@/api/mockPaymentAPI';

// Create order
const order = await mockPaymentAPI.createMockOrder('test', 999);

// View all payments
console.log(mockPaymentAPI.getAllMockPayments());

// Reset database
mockPaymentAPI.resetMockDatabase();
```

## Component Hierarchy

```
PaymentModal
├── Real Mode
│   └── Razorpay Checkout
└── Mock Mode
    └── Mock Confirmation Dialog
        ├── Payment Details
        ├── Warning Box
        └── Confirm/Cancel Buttons
```

## Styling Features

### Mock Badge
Yellow badge indicating test mode:
```
🧪 Mock Payment Confirmation
TEST MODE
```

### Warning Box
Warns users it's a test payment:
- Orange/yellow background
- Clear messaging
- Non-intrusive

### Confirmation Buttons
- ✅ Confirm Mock Payment (Green)
- ✕ Cancel (Gray)

## Performance

- **Order Creation**: ~800ms (simulated)
- **Payment Verification**: ~1200ms (simulated)
- **Status Check**: ~500ms (simulated)
- **Memory**: In-memory Map storage (lightweight)

## Best Practices

1. **Always reset mock data** before each test session
2. **Use PaymentDemo component** for manual testing
3. **Implement error handling** in real payment flow
4. **Test both success and failure scenarios**
5. **Use unique course IDs** for different tests

## Troubleshooting

### Mock Mode Not Activating?
- Check if backend returns correct test key
- Verify `rzp_test_1234567890abcd` key is being sent
- Clear browser storage and try again

### Payment Status Not Showing?
- Ensure payment was verified successfully
- Check browser console for errors
- Use `getAllMockPayments()` to verify data

### Styles Not Loading?
- Import `paymentmodal.css` and `paymentdemo.css`
- Check CSS file paths
- Clear browser cache

## Future Enhancements

- [ ] Add payment history visualization
- [ ] Implement batch payment testing
- [ ] Add webhook simulation
- [ ] Create payment analytics dashboard
- [ ] Add test data export/import

## Support

For issues or improvements, refer to the course structure documentation or contact the development team.

---

**Last Updated:** June 2026  
**Version:** 1.0.0  
**Status:** Production Ready ✅
