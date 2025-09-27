const express = require("express");
const router = express.Router();
const Mailjet = require("node-mailjet");

router.post("/", async (req, res) => {
  const { name, phone, email, reason } = req.body;

  try {
    // connect to Mailjet API
    const mailjet = Mailjet.apiConnect(
      process.env.MJ_APIKEY_PUBLIC,
      process.env.MJ_APIKEY_PRIVATE
    );

    // send email
    await mailjet
      .post("send", { version: "v3.1" })
      .request({
        Messages: [
          {
            From: {
              Email: process.env.MJ_FROM, // verified sender
              Name: "Portfolio Contact",
            },
            To: [
              {
                Email: process.env.MJ_TO, // your receiving email
              },
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
              Name: name,
            },
          },
        ],
      });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (error) {
    console.error("Email error:", error.response?.res?.text || error.message);
    res.status(500).json({ success: false, message: "Failed to send email" });
  }
});

module.exports = router;
