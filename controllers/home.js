const User = require("../models/user");
const AssignedReview = require("../models/assignedReview");
const MyReview = require("../models/myReviews");

// Controller function for rendering the home page
module.exports.home = async function (req, res) {
  try {
    // Fetch the current user and populate assignedReviews and myReviews
    let user = await User.findById(req.user.id)
      .populate({
        path: "assignedReviews",
        populate: {
          path: "toUser",
        },
      })
      .populate({
        path: "myReviews",
        populate: {
          path: "fromUser",
        },
      });

    // Find completed reviews for the current user
    let completedReviews = await MyReview.find({
      toUser: req.user.id,
    });

    // Find pending reviews assigned to the current user
    let pendingReviews = await AssignedReview.find({
      toUser: req.user.id,
    });

    // Render the home page with user, completedReviews, and pendingReviews data
    res.render("./home", {
      user: user,
      completedReviews: completedReviews,
      pendingReviews: pendingReviews,
    });
  } catch (error) {
    console.log("Error", error);
    res.redirect("/");
  }
};

// Controller function for completing a review
module.exports.completeReview = async function (req, res) {
  try {
    // Find the assigned review
    let review = await AssignedReview.findOne({
      fromUser: req.user,
      toUser: req.body.toUser,
    });

    // Remove the assigned review from the user's assignedReviews array
    await User.findByIdAndUpdate(req.user, {
      $pull: { assignedReviews: review.id },
    });

    // Delete the assigned review
    await AssignedReview.findByIdAndDelete(review.id);

    // Create a new review in the MyReview model
    review = await MyReview.create({
      fromUser: req.user,
      toUser: req.body.toUser,
      message: req.body.message,
    });

    // Find the recipient user and update its myReviews array
    let user = await User.findById(req.body.toUser);
    user.myReviews.push(review);
    user.save();

    // Flash a success message and redirect back
    req.flash("success", "Review Submitted Successfully");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};
