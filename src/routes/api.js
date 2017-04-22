let router  = require("express").Router();
let profile = require("./api/profile");

router.use("/profile", profile);

module.exports = router;
