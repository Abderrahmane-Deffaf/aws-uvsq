


function counterHandler(req, res) {
  const cnt = req.cookies.cnt ;

  if ( !cnt) {
    res.cookie("cnt", 1 , {
      httpOnly: true ,
    });
  }else {
    res.cookie("cnt", parseInt(cnt) + 1, {
      httpOnly: true ,
    });
  }
  const name = req.query.name;
  res.render("counter.html", { name, cnt });
}

module.exports = counterHandler;