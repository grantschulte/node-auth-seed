const express         = require("express");
const bodyParser      = require("body-parser");
const morgan          = require("morgan");
const passport        = require("passport");
const config          = require("dotenv").config();
const utils           = require("./utils/utils");
const db              = require("./db");
const passportConfig  = require("./config/passport")
const port            = process.env.PORT || process.env.DEFAULT_PORT;
const app             = express();

let routesPublic = require("./routes/index");
let routesApi    = require("./routes/api");
let routesUser   = require("./routes/user");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

app.use(passport.initialize());
passportConfig(passport);

app.use("/", routesPublic);
app.use("/api", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (error, user, info) => {
    let errorResponse = {
      message: "Token could not be authenticated",
      fullError: error
    };

    if (error) {
      res.status(403).json(errorResponse);
    }

    if (user) {
      return next();
    }

    res.status(403).json(errorResponse);;
  })(req, res, next);
});
app.use("/api", routesApi);
app.use("/user", routesUser);

app.listen(port, () => {
  utils.bootLog(port, app.get("env"));
});

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
