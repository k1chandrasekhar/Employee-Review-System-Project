const express = require("express");
const router = express.Router();
const homeController = require("../controllers/home");
const passport = require("passport"); // Importing passport for authentication

// Route for home page (GET request)
router.get("/", passport.checkAuthentication, homeController.home);

// Route for completing a review (POST request)
router.post(
  "/completeReview",
  passport.checkAuthentication,
  homeController.completeReview
);

// Route handlers for user-related routes
router.use("/users", require("./users"));

// Route handlers for review-related routes
router.use("/review", require("./review"));

// Route handlers for employee section related routes
router.use("/employee", require("./employeeSection"));

// Exporting the router
module.exports = router;
