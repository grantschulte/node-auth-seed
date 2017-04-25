let router    = require("express").Router();
const users   = require("./users/users");

router
  .get("/", users.all)
  .post("/signup", users.signup)
  .post("/signin", users.signin);

module.exports = router;
