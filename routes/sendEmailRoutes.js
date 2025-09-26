const express = require("express");
const router = express.Router();
const SibApiV3Sdk = require("sib-api-v3-sdk");

router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.SENDINBLUE_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
      sender: { email: process.env.SENDINBLUE_FROM, name: "Portfolio Contact" },
      to: [{ email: process.env.SENDINBLUE_TO }],
      subject: "New Contact Form Submission",
      textContent: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}`,
      htmlContent: `
        <h2>New Contact Form Submission</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Reason:</b> ${reason}</p>
      `,
      replyTo: { email, name }
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.response || error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
