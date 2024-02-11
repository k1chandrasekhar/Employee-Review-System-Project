const User = require("../models/user");
const AssignedReview = require("../models/assignedReview");
const MyReview = require("../models/myReviews");

// Controller function for rendering the employee section page
module.exports.home = async function (req, res) {
  try {
    // Fetch all users from the database
    let users = await User.find({});
    // Render the employee section page with the users data
    res.render("./employeeSection", {
      users: users,
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// Controller function for updating user details
module.exports.update = async function (req, res) {
  try {
    // Find the user by ID
    let user = await User.findById(req.params.id);
    // Check if user details are unchanged
    if (
      user.name == req.body.name &&
      user.email == req.body.email &&
      user.password == req.body.password
    ) {
      req.flash("success", "No Values Updated");
      return res.redirect("back");
    }
    // Update user details
    user.name = req.body.name;
    user.email = req.body.email;
    user.password = req.body.password;
    user.save();
    // Flash a success message and redirect back
    req.flash("success", "User Updated successfully");
    return res.redirect("back");
  } catch (error) {
    console.log(`Error: ${error}`);
    return res.redirect("back");
  }
};

// Controller function for deleting a user
module.exports.delete = async function (req, res) {
  try {
    // Find the user by ID and delete
    let user = await User.findById(req.params.id);
    user.deleteOne();
    // Delete assigned reviews associated with the user
    await AssignedReview.deleteMany({ fromUser: req.params.id });
    // Find MyReview documents associated with the user
    let myReviewIDS = await MyReview.find({ fromUser: req.params.id });
    for (let review of myReviewIDS) {
      let userId = review.toUser;
      // Update MyReview references in the recipient user's myReviews array
      await User.findByIdAndUpdate(userId, { $pull: { myReviews: review.id } });
      await review.deleteOne();
    }
    // Redirect back
    res.redirect("back");
  } catch (error) {
    console.log("Error", error);
  }
};

// Controller function for making a user admin
module.exports.makeadmin = async function (req, res) {
  try {
    // Find the user by ID and update permission to 'admin'
    let user = await User.findById(req.params.id);
    user.permission = "admin";
    user.save();
    // Flash a success message and redirect back
    req.flash("success", "User Promoted to Admin");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};

// Controller function for removing admin privileges from a user
module.exports.removeadmin = async function (req, res) {
  try {
    // Find the user by ID and update permission to 'employee'
    let user = await User.findById(req.params.id);
    user.permission = "employee";
    user.save();
    // Flash a success message and redirect back
    req.flash("success", "User removed as Admin");
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};
