
const knex = require("../db/db-init");
const bycrypt = require("bcrypt");
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const loginValue = typeof login === "string" ? login.trim() : "";

  if (!EMAIL_PATTERN.test(loginValue)) {
    return res.render("index.html", {
      error: "Enter a valid email address.",
      loginValue,
      user: req.session.login,
    });
  }

  const user = await getUserByLogin(loginValue);
  const haschedPassword = user ? user.password : null;
  if (user && await bycrypt.compare(password, haschedPassword)) {
    req.session.login = user.login;
    res.redirect("/users-list");
  } else {
    res.render("index.html", {
      error: "Invalid email or password",
      loginValue,
      user: req.session.login,
    });
  }
}

module.exports = { loginHandler } ;
