const mongoose = require("mongoose");

// Define the schema for the AssignedReview model
const assignedReviewSchema = new mongoose.Schema(
  {
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

// Create the AssignedReview model using the schema
const AssignedReview = mongoose.model("AssignedReview", assignedReviewSchema);

// Export the AssignedReview model
module.exports = AssignedReview;
