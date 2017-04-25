const jwt         = require("jsonwebtoken");
const User        = require("../models/user");

function bootLog(port, env, message = "Started...") {
  console.log(`--- ${ message }`);
  console.log(`--- Up on ${ port }`);
  console.log(`--- Running in ${ env }`);
}

function checkUniquenessOfUser(reqBody, callback) {
  let username = reqBody.username ? reqBody.username.trim() : "";
  let email    = reqBody.email ? reqBody.email.trim() : "";

  User.findOne({
    $or: [{
      "username": new RegExp(["^", username, "$"].join(""), "i")
    }, {
      "email": new RegExp(["^", email, "$"].join(""), "i")
    }]
  }, function(error, user) {
    if (error) {
      console.log("About to throw.");
      throw error;
    }

    if (!user) {
      callback();
      return;
    }

    if (user.username === username) {
      error = `${username} is not unique.`;
    }

    callback(error);
  });
}

function getCleanUser(user) {
  if (!user) {
    return {};
  }

  let u = user.toJSON();
  let { _id, username, admin, createdAt, updatedAt } = u;

  return {
    _id,
    username,
    admin,
    createdAt,
    updatedAt
  };
}

function generateToken(user) {
  let { username, admin, _id } = user;

  _id = _id.toString()

  let u = {
    username,
    admin,
    _id
  };

  return jwt.sign(u, process.env.SECRET, {
    expiresIn: 60 * 60 * 24
  });
}

function verifyToken(req, res, next) {
  let token = req.headers.authorization;

  if (!token) {
    return next();
  }

  token = token.replace("Bearer ", "");

  jwt.verify(token, process.env.SECRET, (error, user) => {
    if (error) {
      return res.status(401).json({
        success: false,
        message: "Please register or log in."
      });
    } else {
      req.user = user;
      next();
    }
  });
}

module.exports = {
  bootLog,
  checkUniquenessOfUser,
  generateToken,
  verifyToken,
  getCleanUser
};
