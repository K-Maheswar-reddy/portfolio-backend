// backend/routes/sendEmail.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST route
router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,           // TLS port
      secure: false,       // false for TLS
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Verify SMTP connection
    await transporter.verify();
    console.log("✅ SMTP server is ready to send emails");

    // Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER, // you can also send to multiple emails as array
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}`
    });

    console.log("📧 Email sent:", info.messageId);
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (error) {
    // Detailed logging for debugging
    console.error("❌ Email sending failed:", error);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
