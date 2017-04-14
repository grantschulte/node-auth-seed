const express = require("express");
const utils   = require("./utils/utils");
const config  = require("./config");
const port    = process.env.PORT || config.DEFAULT_PORT;
const app     = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/about", (req, res) => {
  res.json({ message: "About" });
});

app.listen(port, () => {
  utils.bootLog(port, app.get('env'));
});
