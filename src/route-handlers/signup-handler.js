const User = require("../models/user");

module.exports = {
  post(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({
        success: false,
        message: "Please provide a name and password."
      });
    } else {
      let { username, password } = req.body;

      let user = new User({
        username,
        password
      });

      user.save((error) => {
        let success, message;

        if (error) {
          [success, message] = [false, error];
        } else {
          [success, message] = [true, "Success. User created."];
        }

        res.json({ success, message });
      });
    }
  }
};
