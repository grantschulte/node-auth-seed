let router = require("express").Router();
let people = require("./api/people");

router.use("/people", people);

module.exports = router;
