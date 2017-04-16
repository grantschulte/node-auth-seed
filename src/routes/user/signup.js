const router        = require("express").Router();
const signupHandler = require("../../route-handlers/signup-handler");

router.route("/")
  .post(signupHandler.post);

module.exports = router;
