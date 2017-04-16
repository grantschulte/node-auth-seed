const router = require("express").Router();
const User   = require("../models/user");

router.route("/")

  .get((req, res) => {
    res.send("Signup");
  })

  .post((req, res) => {
    if (!req.body.username || !req.body.password) {
      let [success, message] = [false, "Please provide a name and password."];
      res.json({ success, message });
    } else {
      let { username, password, admin = false } = req.body;

      let user = new User({
        username,
        password,
        admin
      });

      user.save((error) => {
        let success, message;

        if (error) {
          [success, message] = [false, "Username already taken."];
        } else {
          [success, message] = [true, "Success. User created."];
        }

        res.json({ success, message });
      });
    }
  });

module.exports = router;
