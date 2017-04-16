let router = require("express").Router();

router.get("/", (req, res) => {
  res.json({
    message: "About",
    status: 200
  });
});

module.exports = router;
