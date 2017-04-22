function home(req, res) {
  res.json({
    message: "Home",
    status: 200
  });
}

module.exports = home;
