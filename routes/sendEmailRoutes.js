 // module.exports = router;
const express = require("express");
const router = express.Router();
const brevo = require("@getbrevo/brevo");

router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Initialize Brevo API
    let apiInstance = new brevo.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY; // Use env variable

    // Build email
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: process.env.BREVO_SENDER }; // Verified sender from env
    sendSmtpEmail.to = [{ email: process.env.BREVO_TO }];        // Recipient from env
    sendSmtpEmail.subject = "New Contact Form Submission";
    sendSmtpEmail.htmlContent = `
      <h3>New message from ${name}</h3>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    // Send email
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);
    console.log("✅ Email sent:", data);
    res.status(200).json({ success: true, message: "Email sent successfully" });

  } catch (err) {
    console.error("❌ Brevo error:", err.response?.body || err.message || err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.response?.body?.message || err.message || err
    });
  }
});

module.exports = router;
