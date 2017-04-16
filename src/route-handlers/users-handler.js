const User = require("../models/user");

module.exports = {

  /**
  * Retrieve a list of users
  * GET /users
  */

  get(req, res) {
    User.find({}, (error, users) => {
      if (error) {
        throw error;
      }
      res.json(users);
    });
  },

  /**
  * Get a user by id
  * GET /users/1
  */

  getOne(req, res) {
    User.findBy({ _id: req.params.userId }, (error, user) => {
      if (error) {
        throw error;
      }
      res.json(user);
    });
  },

  /**
  * Update a user by id
  * PUT /users/1
  */

  updateOne(req, res) {
    res.send(`UPDATE user with id ${req.params.userId}`);
  },

  /**
  * Remove a user by id
  * DELETE /users/1
  */

  deleteOne(req, res) {
    res.send(`DELETE user with id ${req.params.userId}`);
  }
};
