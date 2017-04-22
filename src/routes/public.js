let router    = require("express").Router();
const home    = require("./public/home");
const users   = require("./public/users");

router
  .get("/", home)
  .get("/users", users.all)
  .post("/users/signup", users.signup)
  .post("/users/signin", users.signin);

module.exports = router;
