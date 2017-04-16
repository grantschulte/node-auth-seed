const router = require("express").Router();
const User   = require("../models/user");
const usersHandler = require("../route-handlers/usersHandler");

router.route("/")
  .get(usersHandler.get);

router.route("/:userId")
  .get(usersHandler.getOne)
  .put(usersHandler.updateOne)
  .delete(usersHandler.deleteOne);

module.exports = router;
