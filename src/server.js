const express         = require("express");
const bodyParser      = require("body-parser");
const morgan          = require("morgan");
const jwt             = require("jsonwebtoken");
const expressJwt      = require("express-jwt");
const config          = require("dotenv").config();
const utils           = require("./utils/utils");
const db              = require("./db");
const port            = process.env.DEFAULT_PORT || process.env.PORT;
const app             = express();

let routesPublic = require("./routes/public");
let routesApi    = require("./routes/api");

app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin",       "*");
  res.header("Access-Control-Request-Headers",    "*");
  res.header("Access-Control-Allow-Methods",      "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers",      "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Credentials",  "true");
  next();
});

app.set("view engine", "html");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

/**
* Routes
*/
app.use(utils.verifyToken);
app.use("/", routesPublic);
app.use("/api", (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Permission Denied!"
    });
  }

  next();
})
app.use("/api", routesApi);

/**
* Start Server
*/

app.listen(port, () => {
  utils.bootLog(port, app.get("env"));
});

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

module.exports = app;
