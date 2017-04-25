const router = require("express").Router();
const expressJwt = require("express-jwt");
const users = require("./users");
const api   = require("./api");

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Home",
    success: true
  });
});

router.use("/users", users);

router.use("/api", (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      message: "Permission Denied!"
    });
  }
  next();
});

router.use("/api", api);

module.exports = router;
