const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER, // your Gmail address
    pass: process.env.GMAIL_PASS // the 16-char App Password
  }
});

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Build the email
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.ELASTIC_EMAIL_USER}>`,
      to: process.env.ELASTIC_EMAIL_TO, // your inbox
      subject: "New Contact Form Submission",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
      html: `
        <h3>New message from ${name}</h3>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
      `
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);

    console.log("✅ Email sent:", info.messageId);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Elastic Email error:", err.message || err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message || err
    });
  }
});

module.exports = router;
