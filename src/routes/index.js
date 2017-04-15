let router = require("express").Router();

/**
* Route imports
*/

const home  = require("./home");
const about = require("./about");
const users = require("./users");

/**
* Route assignment
*/

router.use("/", home);
router.use("/about", about);
router.use("/users", users);

module.exports = router;
