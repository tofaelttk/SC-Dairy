const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true }, // Auto-generated from email
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  classOfYear: { type: Number, required: true, default: 0 },
  sports: { type: [String], default: [] },
  profilePicture: { type: String, default: "" },
  relationshipStatus: { type: String, enum: ["Single", "In a Relationship", "Complicated", ""], default: "" },
  majorsMinors: { type: [String], default: [] },
  privacySettings: {
    bioVisibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    classOfYearVisibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    sportsVisibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    relationshipStatusVisibility: { type: String, enum: ["Public", "Private"], default: "Public" },
    majorsMinorsVisibility: { type: String, enum: ["Public", "Private"], default: "Public" },
  },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match entered password with hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate username from email
userSchema.pre("save", function (next) {
  if (!this.username) {
    this.username = this.email.split("@")[0]; // Extract before '@' from email
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
