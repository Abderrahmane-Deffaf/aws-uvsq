

function byeHandler(req, res) {
  const name = req.query.nickName ; 
  res.render("bye.html", { name: name || "world" });
}

module.exports = byeHandler;