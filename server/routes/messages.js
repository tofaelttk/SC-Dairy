const express = require("express");
const Message = require("../models/Message");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware for Authentication
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id;
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Send a Message
router.post("/", verifyToken, async (req, res) => {
  const { recipient, text } = req.body;

  try {
    const message = new Message({
      sender: req.user,
      recipient,
      text,
    });

    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: "Failed to send message." });
  }
});

// Fetch Conversations Between Two Users
router.get("/:recipientId", verifyToken, async (req, res) => {
  const { recipientId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { sender: req.user, recipient: recipientId },
        { sender: recipientId, recipient: req.user },
      ],
    })
      .sort({ createdAt: 1 })
      .populate("sender", "name username profilePicture")
      .populate("recipient", "name username profilePicture");

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch messages." });
  }
});

module.exports = router;