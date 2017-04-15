const express  = require("express");
const config   = require("dotenv").config();
const utils    = require("./utils/utils");
const db       = require("./db");
const port     = process.env.PORT || process.env.DEFAULT_PORT;
const app      = express();

let routes = require('./routes');
app.use("/", routes);

app.listen(port, () => {
  utils.bootLog(port, app.get("env"));
});
