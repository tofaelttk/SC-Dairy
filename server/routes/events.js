const express = require("express");
const Event = require("../models/Event");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const router = express.Router();

// Middleware for Authentication
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified.id; // Add user ID to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};

// Create an Event
router.post("/", verifyToken, async (req, res) => {
  const { name, description, date, time, location, tags, privacy } = req.body;

  try {
    const newEvent = new Event({
      name,
      description,
      date,
      time,
      location,
      organizer: req.user,
      tags,
      privacy,
    });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: "Failed to create event." });
  }
});

// Get All Events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate("organizer", "name username profilePicture")
      .sort({ date: 1, time: 1 }); // Sort by date and time
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch events." });
  }
});

// RSVP to an Event
router.put("/:id/rsvp", verifyToken, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event.attendees.includes(req.user)) {
      event.attendees.push(req.user);
      await event.save();
    }
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to RSVP to event." });
  }
});

// Get Event by ID
router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate("organizer", "name username profilePicture")
      .populate("attendees", "name username profilePicture");
    if (!event) return res.status(404).json({ error: "Event not found" });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch event." });
  }
});

module.exports = router;
