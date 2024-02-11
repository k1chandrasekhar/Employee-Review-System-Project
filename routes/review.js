const express = require("express");
const router = express.Router();
const passport = require("passport"); // Importing passport for authentication

const assignWork = require("../controllers/review"); // Importing the review controller

// Route for displaying the assign work page (GET request)
router.get("/assignWork", passport.restrictAccessPages, assignWork.home);

// Route for creating a review (POST request)
router.post("/createReview", assignWork.createReview);

module.exports = router;
