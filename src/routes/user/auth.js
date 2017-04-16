const router      = require("express").Router();
const authHandler = require("../../route-handlers/auth-handler");

router.route("/")
  .post(authHandler.post);

module.exports = router;
