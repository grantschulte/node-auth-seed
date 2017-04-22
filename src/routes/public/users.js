const router = require("express").Router();
const bcrypt = require("bcrypt");
const User   = require("../../models/user");
const utils  = require("../../utils/utils");
const expressJwt = require("express-jwt");

/**
 * Create a user
 *
 * Method: POST
 * URL: /users/signup
 *
 */

router.post("/signup", (req, res) => {
  let body = req.body;

  if (!body.username || !body.password) {
    return res.status(403).json({
      success: false,
      message: "Please provide a name and password."
    });
  }

  utils.checkUniquenessOfUser(body, (error) => {
    if (error) {
      throw error;
    }

    let hash = bcrypt.hashSync(body.password.trim(), 10);

    let user = new User({
      username: body.username.trim(),
      password: hash,
      admin: false
    });

    user.save((error, user) => {
      if (error) {
        throw error;
      }

      let token = utils.generateToken(user);
      user      = utils.getCleanUser(user);

      res.json({
        user,
        token
      });
    });
  });
});

/**
 * Sign a user in
 *
 * Method: POST
 * URL: /users/signin
 * Returns: { user, token }
 */

router.post("/signin", (req, res) => {
  User.findOne({
    username: req.body.username
  }, (error, user) => {
    if (error) {
      throw error;
    }

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Username or Password is wrong"
      });
    }

    bcrypt.compare(req.body.password, user.password, function(err, valid) {
      if (!valid) {
        return res.status(404).json({
          error: true,
          message: "Username or Password is Wrong"
        });
      }

      let token = utils.generateToken(user);

      res.json({
        user,
        token
      });
    });
  });
});


/**
 * Get all users
 *
 * Method: GET
 * URL: /users/all
 *
 */

router.get("/?", (req, res) => {
  console.log("REQ USER", req.user);
  if (!req.user || !req.user.admin) {
    return res.status(401).json({
      error: "You must be admin to access this route."
    });
  }

  User.find({}, (error, users) => {
    if (error) {
      throw error;
    }

    res.json(users);
  });
});

module.exports = router;