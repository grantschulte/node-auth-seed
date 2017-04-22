let router    = require("express").Router();
const home    = require("./public/home");
const users   = require("./public/users");

router.use("/", home);
router.use("/users", users);

module.exports = router;
