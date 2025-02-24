const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables from .env file

const router = express.Router();

router.post("/", async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Validate the data
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail as the service provider
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address from .env
        pass: process.env.EMAIL_PASS, // Your Gmail app password from .env
      },
    });

    // Email to Admin (You)
    const adminMailOptions = {
      from: `"EliteTriangle Support" <${process.env.EMAIL_USER}>`, // Your website's email
      to: process.env.EMAIL_USER, // Admin email address (your email)
      subject: `New Contact Form Submission: ${subject}`,
      text: `You received a new message from ${name} (${email}):\n\n${message}`,
    };

    // Email to User (Confirmation)
    const userMailOptions = {
      from: `"EliteTriangle Support" <${process.env.EMAIL_USER}>`, // Your website's email
      to: email, // User's email address
      subject: `Thank you for contacting EliteTriangle`,
      text: `Hi ${name},\n\nThank you for reaching out to us! Here is a copy of your message:\n\n"${message}"\n\nWe will get back to you shortly.\n\nBest regards,\nEliteTriangle Support Team`,
    };

    // Send emails
    await transporter.sendMail(adminMailOptions); // Send email to admin
    await transporter.sendMail(userMailOptions); // Send email to user

    // Respond to the client
    res.status(200).json({ message: "Your message has been sent successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    res.status(500).json({ error: "Failed to send your message. Please try again later." });
  }
});

module.exports = router;
