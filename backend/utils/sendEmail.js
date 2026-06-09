import nodemailer from "nodemailer";

export const sendEmail = async (
  email,
  subject,
  message
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      html: `
        <div style="
          font-family: Arial, sans-serif;
          padding: 20px;
          background-color: #f5f5f5;
          border-radius: 5px;
        ">
          <h2 style="color: #4F46E5;">LMS-CourseX</h2>
          <p style="color: #333; font-size: 14px;">
            ${message}
          </p>
          <p style="color: #666; font-size: 12px;">
            This OTP will expire in 10 minutes.
          </p>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Email sending error:", error);
    throw new Error("Failed to send email");
  }
};

export default sendEmail;

// Send payment receipt email
export const sendPaymentReceipt = async (
  email,
  userName,
  courseTitle,
  paymentDetails
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const receiptHTML = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
        background-color: #f8f9fa;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        ">
          <h1 style="margin: 0; font-size: 28px;">💳 Payment Receipt</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">CourseX LMS</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px; background-color: white;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
            Hi <strong>${userName}</strong>,
          </p>

          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            Thank you for your purchase! Your payment has been processed successfully. Here's your receipt:
          </p>

          <!-- Receipt Details -->
          <div style="
            background-color: #f8f9fa;
            border-left: 4px solid #667eea;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
          ">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Course
                </td>
                <td style="padding: 12px 0; color: #333; font-size: 13px; font-weight: 600; text-align: right;">
                  ${courseTitle}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Order ID
                </td>
                <td style="padding: 12px 0; color: #333; font-size: 13px; text-align: right;">
                  ${paymentDetails.orderId}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Amount
                </td>
                <td style="padding: 12px 0; color: #667eea; font-size: 16px; font-weight: 700; text-align: right;">
                  ₹${paymentDetails.amount.toFixed(2)}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Payment Method
                </td>
                <td style="padding: 12px 0; color: #333; font-size: 13px; text-align: right;">
                  ${paymentDetails.paymentMethod}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #e0e0e0;">
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Transaction ID
                </td>
                <td style="padding: 12px 0; color: #333; font-size: 13px; text-align: right;">
                  ${paymentDetails.paymentId || "N/A"}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 0; color: #666; font-size: 13px; font-weight: 500;">
                  Date & Time
                </td>
                <td style="padding: 12px 0; color: #333; font-size: 13px; text-align: right;">
                  ${new Date(paymentDetails.createdAt).toLocaleString()}
                </td>
              </tr>
            </table>
          </div>

          <!-- Status Badge -->
          <div style="
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 30px;
            text-align: center;
          ">
            <p style="margin: 0; color: #155724; font-size: 14px; font-weight: 600;">
              ✓ Payment Successful
            </p>
            <p style="margin: 5px 0 0 0; color: #155724; font-size: 12px;">
              You can now access the course immediately
            </p>
          </div>

          <!-- Action Button -->
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.FRONTEND_URL || "http://localhost:5174"}/mylearning" style="
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 12px 30px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: 600;
              font-size: 14px;
            ">
              Go to My Courses
            </a>
          </div>

          <!-- Additional Info -->
          <div style="
            background-color: #f0f5ff;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
          ">
            <p style="margin: 0; color: #666; font-size: 12px; line-height: 1.6;">
              <strong>📌 Important:</strong> This receipt is for your records. If you have any issues accessing the course, please contact our support team immediately.
            </p>
          </div>

          <!-- Footer -->
          <div style="
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
            text-align: center;
          ">
            <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
              © 2024 CourseX LMS. All rights reserved.
            </p>
            <p style="color: #999; font-size: 11px; margin: 0;">
              If you didn't make this purchase, please contact support immediately.
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Payment Receipt - ${courseTitle}`,
      html: receiptHTML,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Payment receipt email error:", error);
    throw new Error("Failed to send payment receipt");
  }
};

// Send refund notification email
export const sendRefundNotification = async (
  email,
  userName,
  courseTitle,
  refundDetails
) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const refundHTML = `
      <div style="
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        max-width: 600px;
        margin: 0 auto;
        padding: 0;
        background-color: #f8f9fa;
      ">
        <!-- Header -->
        <div style="
          background: linear-gradient(135deg, #10B981 0%, #059669 100%);
          color: white;
          padding: 30px;
          text-align: center;
          border-radius: 10px 10px 0 0;
        ">
          <h1 style="margin: 0; font-size: 28px;">🔄 Refund Approved</h1>
          <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">CourseX LMS</p>
        </div>

        <!-- Content -->
        <div style="padding: 30px; background-color: white;">
          <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
            Hi <strong>${userName}</strong>,
          </p>

          <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
            Good news! Your refund has been approved and processed. Here are the details:
          </p>

          <!-- Refund Details -->
          <div style="
            background-color: #d4edda;
            border-left: 4px solid #10B981;
            padding: 20px;
            border-radius: 5px;
            margin-bottom: 30px;
          ">
            <table style="width: 100%; border-collapse: collapse;">
              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; color: #155724; font-size: 13px; font-weight: 500;">
                  Course
                </td>
                <td style="padding: 12px 0; color: #155724; font-size: 13px; font-weight: 600; text-align: right;">
                  ${courseTitle}
                </td>
              </tr>

              <tr style="border-bottom: 1px solid #c3e6cb;">
                <td style="padding: 12px 0; color: #155724; font-size: 13px; font-weight: 500;">
                  Refund Amount
                </td>
                <td style="padding: 12px 0; color: #10B981; font-size: 16px; font-weight: 700; text-align: right;">
                  ₹${refundDetails.amount.toFixed(2)}
                </td>
              </tr>

              <tr>
                <td style="padding: 12px 0; color: #155724; font-size: 13px; font-weight: 500;">
                  Processed On
                </td>
                <td style="padding: 12px 0; color: #155724; font-size: 13px; text-align: right;">
                  ${new Date(refundDetails.processedAt).toLocaleString()}
                </td>
              </tr>
            </table>
          </div>

          <!-- Information -->
          <div style="
            background-color: #f0f5ff;
            border-radius: 5px;
            padding: 15px;
            margin-bottom: 20px;
          ">
            <p style="margin: 0; color: #1f2937; font-size: 13px; line-height: 1.6;">
              <strong>📌 Important:</strong>
            </p>
            <ul style="margin: 10px 0 0 0; padding-left: 20px; color: #1f2937; font-size: 12px; line-height: 1.8;">
              <li>The refund amount will be credited to your original payment method within 5-7 business days</li>
              <li>You have been unenrolled from the course and no longer have access to course materials</li>
              <li>Your course progress and certificates have been removed</li>
            </ul>
          </div>

          <!-- Support Link -->
          <div style="text-align: center; margin-bottom: 30px;">
            <p style="color: #666; font-size: 13px; margin-bottom: 10px;">
              If you have any questions, please contact our support team
            </p>
            <a href="${process.env.FRONTEND_URL || "http://localhost:5174"}/contact" style="
              display: inline-block;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 10px 25px;
              text-decoration: none;
              border-radius: 5px;
              font-weight: 600;
              font-size: 13px;
            ">
              Contact Support
            </a>
          </div>

          <!-- Footer -->
          <div style="
            border-top: 1px solid #e0e0e0;
            padding-top: 20px;
            text-align: center;
          ">
            <p style="color: #999; font-size: 12px; margin: 0 0 10px 0;">
              © 2024 CourseX LMS. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    `;

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Refund Approved - ${courseTitle}`,
      html: refundHTML,
    };

    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.log("Refund email error:", error);
    throw new Error("Failed to send refund notification");
  }
};