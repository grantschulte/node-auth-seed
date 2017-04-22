let router  = require("express").Router();
let profile = require("./api/profile");

router
  .get("/profile", profile.get)
  .put("/profile", profile.update);

module.exports = router;
