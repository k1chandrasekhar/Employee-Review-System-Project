const mongoose = require("mongoose");

// Define the schema for the MyReview model
const myReviewSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
    },
  },
  {
    timestamps: true, // Automatically add timestamps for createdAt and updatedAt
  }
);

// Create the MyReview model using the schema
const MyReview = mongoose.model("MyReview", myReviewSchema);

// Export the MyReview model
module.exports = MyReview;
