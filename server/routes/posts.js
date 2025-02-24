const express = require("express");
const Post = require("../models/Post");
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

// Create a Post
router.post("/", verifyToken, async (req, res) => {
  const { content, media, privacy } = req.body;

  try {
    const newPost = new Post({
      user: req.user,
      content,
      media,
      privacy,
    });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post." });
  }
});

// Get Posts for Feed
router.get("/feed", verifyToken, async (req, res) => {
  try {
    const posts = await Post.find({
      $or: [
        { privacy: "Public" }, // Public posts
        { privacy: "Followers", user: req.user }, // Posts from the user
      ],
    })
      .populate("user", "name username profilePicture")
      .sort({ createdAt: -1 }); // Newest first
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch posts." });
  }
});

// Like a Post
router.put("/:id/like", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.user)) {
      post.likes.push(req.user);
      await post.save();
    }
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to like post." });
  }
});

// Comment on a Post
router.put("/:id/comment", verifyToken, async (req, res) => {
  const { text } = req.body;

  try {
    const post = await Post.findById(req.params.id);
    post.comments.push({
      user: req.user,
      text,
    });
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: "Failed to comment on post." });
  }
});

module.exports = router;
