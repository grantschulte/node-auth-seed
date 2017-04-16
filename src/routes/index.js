let router    = require("express").Router();
const home    = require("./public/home");
const about   = require("./public/about");

router.use("/", home);
router.use("/about", about);

module.exports = router;
