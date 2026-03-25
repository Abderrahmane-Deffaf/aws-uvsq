
const knex = require("../db/db-init");
const bycrypt = require("bcrypt");

async function getUserByLogin(login) {
  try {
    const user = await knex("users").where({ login }).first();
    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function loginHandler(req, res) {
  const { login, password } = req.body;
  const user = await getUserByLogin(login);
  const haschedPassword = user ? user.password : null;
  if (user && await bycrypt.compare(password, haschedPassword)) {
    req.session.login = user.login;
    res.redirect("/users-list");
  } else {
    res.render("index.html" , {error : "Invalid login or password"}) ;
  }
}

module.exports = { loginHandler } ;