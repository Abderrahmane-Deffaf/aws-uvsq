


function counterHandler(req, res) {
  const name = req.params.name;
  let cnt = req.params.cnt ;
  if (isNaN(cnt)) {
    cnt = 1 ;  
  }else {
    cnt = parseInt(cnt) + 1 ;
  }
  res.render("counter.html", { name: name, cnt: cnt });
}

module.exports = counterHandler;