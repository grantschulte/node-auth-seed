const express = require("express");
const utils = require("./utils/utils");
const port = process.env.PORT || 5000;
const app = express();

app.get("/", (req, res) => {
  res.json({ message: "Hello world" });
});

app.get("/about", (req, res) => {
  res.json({ message: "About" });
});

app.listen(port, () => {
  utils.bootLog(port, app.get('env'));
});
