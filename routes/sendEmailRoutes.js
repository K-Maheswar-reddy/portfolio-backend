const express = require("express");
const router = express.Router();
const Mailjet = require("node-mailjet");

const mailjet = Mailjet.apiConnect(
  process.env.MJ_APIKEY_PUBLIC,
  process.env.MJ_APIKEY_PRIVATE
);

router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    const request = await mailjet.post("send", { version: "v3.1" }).request({
      Messages: [
        {
          From: {
            Email: process.env.MJ_FROM,
            Name: "Portfolio Contact Form",
          },
          To: [
            {
              Email: process.env.MJ_TO,
              Name: "Portfolio Owner",
            },
          ],
          Subject: "New Contact Form Submission",
          TextPart: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          HTMLPart: `<h3>New message from ${name}</h3>
                     <p><b>Email:</b> ${email}</p>
                     <p><b>Message:</b> ${message}</p>`,
        },
      ],
    });

    console.log("✅ Email sent:", request.body);
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Mailjet error:", err.message || err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message || err,
    });
  }
});

module.exports = router;
