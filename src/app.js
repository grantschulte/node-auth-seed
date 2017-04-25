const express         = require("express");
const bodyParser      = require("body-parser");
const morgan          = require("morgan");
const jwt             = require("jsonwebtoken");
const expressJwt      = require("express-jwt");
const config          = require("dotenv").config();
const utils           = require("./utils/utils");
const cors            = require("./config/cors");
const db              = require("./db");
const app             = express();

app.use(cors);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/**
* Logging
*/

app.use(morgan("dev"));

/**
* Routes
*/

let routes = require("./routes");

app.use(utils.verifyToken);
app.use("/", routes);

/**
* Error Handling
*/

// Catch 404 and forward to error handler
app.use((req, res, next) => {
  var error = new Error("Not Found");
  error.status = 404;
  next(error);
});


// Error handler without stack trace
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  if (error.status === 500) {
    console.error(error.stack);
    res.json({
      error: "Internal Server Error"
    });
  } else if (error.status === 404) {
    res.render("error"); // Show error page.
  } else {
    res.json({
      error: error.message
    })
  }
});

// Export app for testing
module.exports = app;
