require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
const http = require("http");
const { Server } = require("socket.io");
const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const postRoutes = require("./routes/posts");
const messageRoutes = require("./routes/messages");
const eventRoutes = require("./routes/events");
const fs = require("fs");
const multer = require("multer");
const path = require("path");
const contactRoutes = require("./routes/contact"); // Import the contact route
const dotenv = require("dotenv");

console.log("Starting server setup...");

// App Configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;


// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));


console.log("Middleware configured...");

// MongoDB Connection
(async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
    process.exit(1);
  }
})();

// Add the contact route
app.use("/api/contact", contactRoutes);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

//upload photo
const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Test Route
app.get("/", (req, res) => {
  res.status(200).json({ message: "SCDairy Backend is running!" });
  console.log("Root route accessed...");
});

// Use Routes
app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes); // Profile routes
app.use("/api/posts", postRoutes); // Post routes
app.use("/api/messages", messageRoutes); // Message routes
app.use("/api/events", eventRoutes);

// Socket.IO Setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Handle Socket.IO Connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Listen for incoming messages
  socket.on("sendMessage", (messageData) => {
    console.log("Message received:", messageData);

    // Broadcast the message to the recipient
    io.to(messageData.recipientId).emit("receiveMessage", messageData);
  });

  // Handle disconnects
  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

// Start the server
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => console.log(`Server is running at http://localhost:${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
