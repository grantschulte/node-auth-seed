const express         = require("express");
const cors            = require("cors");
const bodyParser      = require("body-parser");
const morgan          = require("morgan");
const passport        = require("passport");
const config          = require("dotenv").config();
const utils           = require("./utils/utils");
const db              = require("./db");
const passportConfig  = require("./config/passport");
const corsOptions     = require("./config/cors");
const port            = process.env.DEFAULT_PORT || process.env.PORT;
const app             = express();

let routesPublic = require("./routes/index");
let routesApi    = require("./routes/api");
let routesUser   = require("./routes/user");

app.options('*', cors());   // Allow PUT/DELETE
app.use(cors(corsOptions)); // Allow cors requests for all routes
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(passport.initialize());
passportConfig(passport);

/**
* Routes
*/

app.use("/", routesPublic);
app.use("/api", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user) => {
    if (error) {
      res.status(403).json({ message: error });
    }

    if (user) {
      return next();
    }

    res.status(403).json({ message: "Token could not be authenticated" });
  })(req, res, next);
});
app.use("/api", routesApi);
app.use("/user", routesUser);

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


// Development error handler prints stacktrace

if (app.get("env") === "development") {
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.render("error", {
      message: error.message,
      error  : error
    });
  });
}

// Production error handler does not send stacktrace

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", {
    message: error.message,
    error  : {}
  });
});
