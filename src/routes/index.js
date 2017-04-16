let router = require("express").Router();

/**
* Route imports
*/

const home    = require("./home");
const about   = require("./about");
const users   = require("./users");
const signup  = require("./signup");
const auth    = require("./auth");

/**
* Route assignment
*/

router.use("/", home);
router.use("/about", about);
router.use("/users", users);
router.use("/signup", signup);
router.use("/auth", auth);

module.exports = router;
