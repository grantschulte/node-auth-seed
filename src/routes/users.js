let router = require("express").Router();

router.route("/")
  .get((req, res) => {
    res.send("GET users");
  })

  .post((req, res) => {
    res.send("CREATE user");
  })
;

router.route("/:userId")
  .get((req, res) => {
    res.send(`GET user with id ${req.params.userId}`);
  })

  .put((req, res) => {
    res.send(`UPDATE user with id ${req.params.userId}`);
  })

  .delete((req, res) => {
    res.send(`DELETE user with id ${req.params.userId}`);
  })
;

module.exports = router;
