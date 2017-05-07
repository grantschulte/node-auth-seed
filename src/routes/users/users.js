const bcrypt = require("bcrypt");
const User   = require("../../models/user");
const utils  = require("../../utils/utils");
const jwt    = require("jsonwebtoken");
const expressJwt = require("express-jwt");

/**
 * Create a user
 *
 * METHOD: POST
 * URL: /users/signup
 */

function signup(req, res) {
  let body = req.body;

  if (!body.username || !body.password) {
    return res.status(403).json({
      success: false,
      message: "Please provide a name and password."
    });
  }

  utils.checkUniquenessOfUser(body, (error) => {
    if (error) {
      return res.status(403).json({
        success: false,
        message: error
      });
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
      user = utils.getCleanUser(user);

      res.json({
        user,
        token
      });
    });
  });
}

/**
 * Sign a user in
 *
 * METHOD: POST
 * URL: /users/signin
 */

function signin(req, res) {
  let body = req.body;

  if (!body.username || !body.password) {
    return res.status(403).json({
      success: false,
      message: "Please provide a name and password."
    });
  }

  User.findOne({
    username: body.username
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

    bcrypt.compare(body.password, user.password, function(err, valid) {
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
}

/**
 * Get all users
 *
 * METHOD: GET
 * URL: /users/all
 */

function all(req, res) {
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
}

function meFromToken(req, res, next) {
  var token = req.body.token
    || req.query.token
    || req.headers["x-access-token"];

  if (!token) {
    return res.status(401).json({
      message: "Must pass token."
    });
  }

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) {
      throw error;
    }

    User.findOne({ "_id": user._id }, (error, user) => {
      if (error) {
        throw error;
      }

      user = utils.getCleanUser(user);

      res.json({
        user,
        token
      });
    });
  });
}

module.exports = { signup, signin, all, meFromToken };
