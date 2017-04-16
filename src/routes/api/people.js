let router = require("express").Router();
let people = [
  {
    name: "Albert Einstein"
  }, {
    name: "George Washington"
  }, {
    name: "John Lennon"
  }, {
    name: "Martin Luther King Jr."
  }
];

router.get("/", (req, res) => {
  res.json({ people });
});

module.exports = router;
