// backend/routes/sendEmail.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST route
router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    // Create transporter with Mailjet SMTP
    const transporter = nodemailer.createTransport({
      host: "in-v3.mailjet.com",  // Mailjet SMTP host
      port: 587,                  // TLS port
      secure: false,              // use TLS, not SSL
      auth: {
        user: process.env.MAILJET_API_KEY,    // Mailjet API Key (public)
        pass: process.env.MAILJET_SECRET_KEY  // Mailjet Secret Key (private)
      }
    });

    // Verify connection
    transporter.verify((err, success) => {
      if (err) console.log("SMTP connection error:", err);
      else console.log("Mailjet SMTP server ready");
    });

    // Send email
    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.MAILJET_FROM}>`, // your verified Mailjet email
      to: process.env.MAILJET_TO,  // where you want to receive submissions
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}`,
      replyTo: email // 👈 so you can reply directly to the visitor
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
