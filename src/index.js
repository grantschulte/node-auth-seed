const express         = require("express");
const bodyParser      = require("body-parser");
const morgan          = require("morgan");
const passport        = require("passport");
const config          = require("dotenv").config();
const utils           = require("./utils/utils");
const db              = require("./db");
const passportConfig  = require('./config/passport')
const port            = process.env.PORT || process.env.DEFAULT_PORT;
const app             = express();

let routes = require('./routes');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

/**
* Initialize and configure passport
*/

app.use(passport.initialize());
passportConfig(passport);

app.use("/", routes);

app.listen(port, () => {
  utils.bootLog(port, app.get("env"));
});
