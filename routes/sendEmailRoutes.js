// const express = require("express");
// const router = express.Router();
// const nodemailer = require("nodemailer");

// // Gmail transporter using App Password and SSL
// const transporter = nodemailer.createTransport({
//   host: "smtp.gmail.com",
//   port: 465,          // SSL port
//   secure: true,       // must be true for port 465
//   auth: {
//     user: process.env.GMAIL_USER, // your Gmail address
//     pass: process.env.GMAIL_PASS  // your 16-char App Password
//   }
// });

// // POST route for contact form
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, phone, message } = req.body;

//     // Build the email
//     const mailOptions = {
//       from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`,
//       to: process.env.GMAIL_TO,       // your inbox
//       subject: "New Contact Form Submission",
//       text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`,
//       html: `
//         <h3>New message from ${name}</h3>
//         <p><b>Email:</b> ${email}</p>
//         <p><b>Phone:</b> ${phone}</p>
//         <p><b>Message:</b> ${message}</p>
//       `
//     };

//     // Send the email
//     const info = await transporter.sendMail(mailOptions);

//     console.log("✅ Email sent:", info.messageId);
//     res.status(200).json({ success: true, message: "Email sent successfully" });
//   } catch (err) {
//     console.error("❌ Gmail error:", err.message || err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send email",
//       error: err.message || err
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const SibApiV3Sdk = require("sib-api-v3-sdk");

// 🔑 Configure Brevo client with API key from Render env
const brevoClient = SibApiV3Sdk.ApiClient.instance;
brevoClient.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

// POST route for contact form
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // ✉️ Build the email
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.sender = { email: process.env.BREVO_SENDER, name: "Portfolio Contact Form" };
    sendSmtpEmail.to = [{ email: process.env.BREVO_TO }];
    sendSmtpEmail.subject = "New Contact Form Submission";
    sendSmtpEmail.htmlContent = `
      <h3>New message from ${name}</h3>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    // 🚀 Send via Brevo API
    await tranEmailApi.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent via Brevo");
    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error("❌ Brevo error:", err.message || err);
    res.status(500).json({
      success: false,
      message: "Failed to send email",
      error: err.message || err
    });
  }
});

module.exports = router;
