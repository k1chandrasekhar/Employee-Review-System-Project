const User = require("../models/user");
const AssignedReview = require("../models/assignedReview");
const MyReview = require("../models/myReviews");

// Controller function for rendering the assign work page
module.exports.home = async function (req, res) {
  try {
    // Fetch all users from the database
    let users = await User.find({});
    // Render the assign work page with the users data
    res.render("./assignwork", {
      users: users,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// Controller function for creating a review
module.exports.createReview = async function (req, res) {
  try {
    // Check if a review already exists for the same recipient and reviewer
    let review = await AssignedReview.findOne({
      fromUser: req.body.reviewer,
      toUser: req.body.recipient,
    });
    if (review) {
      // If review exists, flash a success message and redirect back
      req.flash(
        "success",
        "Review Already Assigned for same Recipient and Reviewer"
      );
      return res.redirect("back");
    }
    // If review doesn't exist, create a new review
    review = await AssignedReview.create({
      fromUser: req.body.reviewer,
      toUser: req.body.recipient,
    });
    // Find the reviewer user and update its assignedReviews array
    let user = await User.findById(req.body.reviewer);
    user.assignedReviews.push(review);
    user.save();
    // Flash a success message and redirect back
    req.flash("success", "Review Assigned Successfully");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
  }
};
