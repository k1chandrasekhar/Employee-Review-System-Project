const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts"); // Importing Express-EJS layouts module
const dotenv = require("dotenv").config(); // Importing and configuring dotenv for environment variables

const port = process.env.PORT || 8000; // Setting port number for server

// Used for Session Cookie
const cookieParser = require("cookie-parser"); // Importing cookie-parser middleware
const session = require("express-session"); // Importing express-session middleware
const passport = require("passport"); // Importing passport authentication middleware
const passportLocal = require("./config/passport-local-strategy"); // Importing passport local strategy

// Setting up static files and EJS layouts
app.use(express.static("./assets"));
app.use(expressLayouts);

const db = require("./config/mongoose"); // Importing mongoose for database connection

const flash = require("connect-flash"); // Importing connect-flash for flash messages
const customMware = require("./config/setupmiddleware"); // Importing custom middleware setup

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Extract styles and scripts from sub pages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// MongoStore is used to store the session cookie in the DB
app.use(
  session({
    name: "employee_review",
    // TODO: Change the secret before deployment
    secret: "test",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100, // Setting max age for session cookie
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

// Use express router for routing
app.use("/", require("./routes/index"));

// Start the server
app.listen(port, function (error) {
  if (error) {
    console.log(`Error in running the server. Error is ${error}`);
  }

  console.log(`Server is up on the port: ${port}`);
});
