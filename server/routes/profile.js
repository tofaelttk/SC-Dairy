const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


const router = express.Router();

// Middleware for Authentication
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ error: "Access denied. No token provided." });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_SECRET); // Extract token after "Bearer"
    req.user = verified.id; // Attach user ID to request
    next();
  } catch (err) {
    res.status(400).json({ error: "Invalid token." });
  }
};


const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/profile-picture", verifyToken, upload.single("profilePicture"), async (req, res) => {
  try {
    console.log("Uploaded file path:", req.file.path); // Log the file path
    const user = await User.findById(req.user);
    user.profilePicture = `/uploads/${req.file.filename}`;
    await user.save();
    res.json({ message: "Profile picture updated successfully!", profilePicture: user.profilePicture });
  } catch (err) {
    console.error("Failed to upload profile picture:", err);
    res.status(500).json({ error: "Internal server error." });
  }
});



// Get User Profile
router.get("/", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user).select("-password"); // Exclude password
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile." });
  }
});

// Update User Profile

router.put("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user; // Extract user ID from token
    const { name, bio, classOfYear, sports, relationshipStatus, majorsMinors } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Update user fields
    if (name) user.name = name;
    if (bio) user.bio = bio;
    if (classOfYear) user.classOfYear = classOfYear;
    if (sports) user.sports = sports;
    if (relationshipStatus) user.relationshipStatus = relationshipStatus;
    if (majorsMinors) user.majorsMinors = majorsMinors;

    await user.save();
    res.json(user);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile." });
  }
});



module.exports = router;
