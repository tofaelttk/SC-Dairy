require("dotenv").config();
const mongoose = require("mongoose");
const User = require("../models/User");

(async function updateUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");

    // Update all users with default values for the new fields
    const result = await User.updateMany(
      {}, // No filter: update all users
      {
        $set: {
          username: null, // This will be auto-generated
          classOfYear: 0,
          sports: [],
          profilePicture: "",
          relationshipStatus: "",
          majorsMinors: [],
          "privacySettings.bioVisibility": "Public",
          "privacySettings.classOfYearVisibility": "Public",
          "privacySettings.sportsVisibility": "Public",
          "privacySettings.relationshipStatusVisibility": "Public",
          "privacySettings.majorsMinorsVisibility": "Public",
        },
      }
    );
    console.log("Users updated:", result.modifiedCount);
    mongoose.disconnect();
  } catch (err) {
    console.error("Error updating users:", err);
  }
})();
