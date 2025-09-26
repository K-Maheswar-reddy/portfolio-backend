// backend/routes/sendEmail.js
const express = require("express");
const router = express.Router();
const Mailjet = require("node-mailjet");

router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    const mailjet = Mailjet.apiConnect(
      process.env.MAILJET_API_KEY,
      process.env.MAILJET_SECRET_KEY
    );

    const request = await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_FROM, // your verified sender
              Name: "Portfolio Contact"
            },
            To: [
              { Email: process.env.MAILJET_TO } // your inbox
            ],
            Subject: "New Contact Form Submission",
            TextPart: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nReason: ${reason}`,
            HTMLPart: `
              <h2>New Contact Form Submission</h2>
              <p><b>Name:</b> ${name}</p>
              <p><b>Phone:</b> ${phone}</p>
              <p><b>Email:</b> ${email}</p>
              <p><b>Reason:</b> ${reason}</p>
            `,
            ReplyTo: {
              Email: email,
              Name: name
            }
          }
        ]
      });

    console.log("📧 Email sent:", request.body);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.response?.body || error.message);
    res.status(500).json({ success: false, message: "Failed to send email", error: error.message });
  }
});

module.exports = router;
