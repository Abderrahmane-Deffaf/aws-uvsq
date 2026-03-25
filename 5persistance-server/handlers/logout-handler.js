


function logoutHanlder(req, res) {
  req.session.destroy();
  res.redirect("/");
}

module.exports = { logoutHanlder } ;
