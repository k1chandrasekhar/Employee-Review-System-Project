// routes/users.js
const express = require("express");
const router = express.Router();
const passport = require("passport");
const userProfile = require("../controllers/user");

// Route to render the sign-up page
router.get("/Signup", passport.restrictAccess, userProfile.SignUp);

// Route to render the sign-in page
router.get("/Signin", passport.restrictAccess, userProfile.Signin);

// Route to register a new user
router.post("/create", userProfile.create);

// Route to register a new admin
router.post("/create-admin", function (req, res) {
  // Implementation for creating admin user
});

// Route to authenticate user session
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/Signin" }),
  userProfile.createSession
);

// Route to destroy user session (logout)
router.get("/Signout", userProfile.destroySession);

module.exports = router;
