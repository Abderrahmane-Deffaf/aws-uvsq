

async function rootHanlder(req, res) {
  const user = req.session.login;
  console.log("User in session:", user);
  res.render("index.html", { user });
}

module.exports = { rootHanlder } ;