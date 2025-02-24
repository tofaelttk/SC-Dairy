const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to the user who created the post
  content: { type: String, required: true }, // Text content of the post
  media: { type: String, default: "" }, // URL or file name for the media (image/video)
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked the post
  comments: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
    },
  ], // Array of comments
  privacy: { type: String, enum: ["Public", "Followers"], default: "Public" }, // Privacy setting
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
