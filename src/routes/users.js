let router    = require("express").Router();
const users   = require("./users/users");

router
  .get("/", users.all)
  .post("/signup", users.signup)
  .post("/signin", users.signin)
  .post("/me/from/token", users.meFromToken);

module.exports = router;
