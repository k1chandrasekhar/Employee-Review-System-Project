const express = require("express");
const router = express.Router();
const passport = require("passport"); // Importing passport for authentication
const employeeSection = require("../controllers/employeeSection"); // Importing the employee section controller

// Route for displaying the employee home page (GET request)
router.get("/home", passport.restrictAccessPages, employeeSection.home);

// Route for updating employee details (POST request)
router.post(
  "/update/:id",
  passport.checkAuthentication,
  employeeSection.update
);

// Route for deleting an employee (GET request)
router.get("/delete/:id", employeeSection.delete);

// Route for making an employee admin (GET request)
router.get("/makeadmin/:id", employeeSection.makeadmin);

// Route for removing admin privileges from an employee (GET request)
router.get("/removeadmin/:id", employeeSection.removeadmin);

// Exporting the router
module.exports = router;
