const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true }, // Format: "HH:mm"
  location: { type: String, required: true },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tags: { type: [String], default: [] }, // Event categories or tags
  privacy: { type: String, enum: ["Public", "College"], default: "Public" },
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who RSVP
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Event", eventSchema);
