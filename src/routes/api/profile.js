let router    = require("express").Router();
let mongoose  = require("mongoose");
let utils     = require("../../utils/utils");
let User      = require("../../models/user");

router.get("/", (req, res) => {
  let id = mongoose.Types.ObjectId(req.user._id);

  User.findById(id, (error, user) => {
    if (error) {
      throw error;
    }

    if (!user) {
      return res.status(404).json({
        message: "You must sign in."
      });
    }

    user = utils.getCleanUser(user);

    res.json({
      success: true,
      private: true,
      message: "This is a private route. You are authenticated if you've reached this page.",
      user
    });
  });
});

module.exports = router;
