const router    = require("express").Router();
const jwt       = require("jwt-simple");
const jwtConfig = require("../config/jwt-config").jwtConfig;
const User      = require("../models/user");

router.route("/")

  .post((req, res) => {
    User.findOne({ username: req.body.username }, (error, user) => {
      if (error) {
        throw error;
      }

      if (!user) {
        res.send({
          success: false,
          message: 'Authentication failed. User not found.'
        });
      } else {
        user.comparePassword(req.body.password, (error, isMatch) => {
          if (!error && isMatch) {
            let token = jwt.encode(user, jwtConfig.secret);

            res.json({
              success: true,
              token: `JWT ${token}`
            });
          } else {
            res.send({
              success: false,
              message: 'Authentication failed. Wrong password.'
            });
          }
        });
      }
    });
  });

module.exports = router;
