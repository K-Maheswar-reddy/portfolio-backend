// backend/routes/sendEmail.js
const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

// POST route
router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS 
      }
    });

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`, 
      to: process.env.GMAIL_USER,
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}`,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;