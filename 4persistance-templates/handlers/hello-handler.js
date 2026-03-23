

function helloHandler(req, res) {
  //const query = req.query;
  const query = req.body;
  console.log("query", query);
  const redFruits = ["cherry", "strawberry", "blood"];
  const yellowFruits = ["sun", "lemon", "banana"];
  const choosedColor = query.color;

  res.set("Set-Cookie", "color=" + choosedColor + "; HttpOnly");

  res.render("hello.html", {
    name: query.nickName || "world",
    fruits: choosedColor === "red" ? redFruits : yellowFruits,
    color: choosedColor,
  });
}

module.exports = helloHandler;