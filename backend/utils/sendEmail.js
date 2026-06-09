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