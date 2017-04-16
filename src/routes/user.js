let router    = require("express").Router();
const signup  = require("./user/signup");
const auth    = require("./user/auth");
const users   = require("./user/users");

router.use("/signup", signup);
router.use("/auth", auth);
router.use("/users", users);

module.exports = router;
